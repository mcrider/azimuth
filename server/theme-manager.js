var fs = Npm.require('fs');

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
