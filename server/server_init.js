// Server-side startup code (set up collections, add default data if needed)

Meteor.startup(function () {

  // Helper functions for authorization
  authorize = {
    authorsAndAdmins: function() {
      if (Meteor.user() && Roles.userIsInRole(Meteor.user(), ['author','admin'])) {
        return true;
      }
      return false;
    },
    admins: function() {
      if (Meteor.user() && Roles.userIsInRole(Meteor.user(), ['admin'])) {
        return true;
      }
      return false;
    }
  }

  // Pages
  Pages = new Meteor.Collection("pages");
  Meteor.publish('pages', function () {
    return Pages.find();
  });
  Pages.allow({
    insert: authorize.authorsAndAdmins,
    update: authorize.authorsAndAdmins,
    remove: authorize.authorsAndAdmins
  });
  if (Pages.find().count() === 0) {
    // Insert default data
    Pages.insert({
      title: "Home",
      slug: "home",
      contents: "<p>Welcome to Azimuth.</p><p>You can add pages from the <i class='icon-cogs'></i>  menu above.</p>",
      template: "page_default"
    });
    Pages.insert({
      title: "About",
      slug: "about",
      contents: "<p>Replace this with some text about your site.</p>",
      template: "page_default"
    });
  }

  // Blocks
  Meteor.publish('blocks', function () {
    return Blocks.find();
  });
  Blocks = new Meteor.Collection("blocks");
  Blocks.allow({
    insert: authorize.authorsAndAdmins,
    update: authorize.authorsAndAdmins,
    remove: authorize.authorsAndAdmins
  });

  // Users
  Meteor.publish('user_list', function () {
    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      return Meteor.users.find();
    } else {
      // Not authorized
      this.stop();
      return;
    }
  });

  Meteor.users.allow({
    insert: authorize.admins,
    update: authorize.admins,
    remove: authorize.admins
  });

  // Roles
  Meteor.publish('roles', function () {
    return Meteor.roles.find();
  });
  Meteor.roles.allow({
    insert: authorize.admins,
    update: authorize.admins,
    remove: authorize.admins
  });

  // Site settings
  Settings = new Meteor.Collection("settings");
  Meteor.publish('settings', function () {
    return Settings.find();
  });
  Settings.allow({
    insert: authorize.admins,
    update: authorize.admins,
    remove: authorize.admins
  });
  if (Settings.find().count() === 0) {
    Settings.insert({
        siteName: "Azimuth CMS",
        logoUrl: "/azimuth.gif",
        showLoginInHeader: true,
        addNewPagesToHeader: true
      });
  }

});