var fs = Npm.require('fs');
var path = Npm.require('path');

Meteor.methods({
  listThemes: function() {
    // return 'foobaz';
    // Deny if user is not admin
    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin'])) {
      console.log('Theme Manager: User not logged in or not admin');
      return false;
    }

    // Get array of files in themes directory
    var files = fs.readdirSync(path.resolve("../../../../../public/themes/"));

    // Iterate over files and select directories that have a theme.json file
    var themeList = [];
    //(We can use underscore here, but not jquery?)
    _.each(files, function(filePath) {
      var fullPath = path.resolve("../../../../../public/themes") + '/' + filePath;
      if(fs.existsSync(fullPath + "/theme.json")) {
        var theme = JSON.parse(fs.readFileSync(fullPath + "/theme.json"));
        theme.path = filePath;
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
      console.log('Setting '+theme+' as current theme...');

      wrench.copyDirSyncRecursive(fullPath, 'client/css/theme', {
        forceDelete: true, // Whether to overwrite existing directory or not
        preserveFiles: false // If we're overwriting something and the file already exists, keep the existing
      });
      console.log('Done!');
    } else {
      console.log("Could not find theme: " + theme);
    }

  }
});
