var fs = Npm.require('fs');

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

Meteor.methods({
  listThemes: function() {
    // return 'foobaz';
    // Deny if user is not admin
    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin'])) {
      console.log('Theme Manager: User not logged in or not admin');
      return false;
    }

    // Get array of files in themes directory
    var files = fs.readdirSync("public/themes/");

    // Iterate over files and select directories that have a theme.json file
    var themeList = [];
    //(We can use underscore here, but not jquery?)
    _.each(files, function(path) {
      var fullPath = "public/themes/" + path;
      if(fs.existsSync(fullPath + "/theme.json")) {
        var theme = JSON.parse(fs.readFileSync(fullPath + "/theme.json"));
        theme.path = path;
        themeList.push(theme);
      }
    })

    // Return array of theme objects
    return themeList;
  },
  selectTheme: function(theme) {
    // Deny if user is not admin
    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin'])) {
      console.log('Theme Manager: User not logged in or not admin');
      return false;
    }

    // Fetch our theme and make sure its valid
    var fullPath = "public/themes/" + theme;
    if(fs.existsSync(fullPath + "/theme.json")) {
      // Delete the current theme directory
      console.log('Deleting current theme...');
      deleteFolderRecursive('client/css/theme/');

      // Copy selected theme into theme directory
      console.log('Copying ' + theme + ' into theme directory...');
      ncp(fullPath, 'client/css/theme', function (err) {
        if (err) {
          return console.error(err);
        }
        console.log('done!');
      });
    } else {
      console.log("Could not find theme: " + theme);
    }

  }
});
