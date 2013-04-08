// Server-side startup code (set up collections, add default data if needed)

Meteor.startup(function () {


  // TODO: If user count is 0, create admin user


  // Pages
  Pages = new Meteor.Collection("pages");
  Meteor.publish('pages', function () {
    return Pages.find();
  });
  Pages.allow({
    insert: function (userId, doc) {
      return true;
      // the user must be logged in, and the document must be owned by the user

      // FIXME: For this and all other methods, return true only if admin role
      // return (userId && doc.owner === userId);
      return userId;
    },
    update: function (userId, doc, fields, modifier) {
      return true;
      return userId;
    },
    remove: function (userId, doc) {
      return true;
      return userId;
    }
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
    insert: function (userId, doc) {
      return true;
      // the user must be logged in, and the document must be owned by the user

      // FIXME: For this and all other methods, return true only if admin role
      // return (userId && doc.owner === userId);
      return userId;
    },
    update: function (userId, doc, fields, modifier) {
      return true;
      return userId;
    },
    remove: function (userId, doc) {
      return true;
      return userId;
    }
  });

  // Users
  Meteor.publish('user_list', function () {
    // FIXME: publish only if admin
    return Meteor.users.find();
  });

  Meteor.users.allow({
     insert: function (userId, doc) {
      return true;
      // the user must be logged in, and the document must be owned by the user

      // FIXME: For this and all other methods, return true only if admin role
      // return (userId && doc.owner === userId);
      return userId;
    },
    update: function (userId, doc, fields, modifier) {
      return true;
      return userId;
    },
    remove: function (userId, doc) {
      return true;
      return userId;
    }
  });

  // Roles
  Meteor.publish('roles', function () {
    // FIXME: publish only if admin
    return Meteor.roles.find();
  });
  Meteor.roles.allow({
     insert: function (userId, doc) {
      return true;
      // the user must be logged in, and the document must be owned by the user

      // FIXME: For this and all other methods, return true only if admin role
      // return (userId && doc.owner === userId);
      return userId;
    },
    update: function (userId, doc, fields, modifier) {
      return true;
      return userId;
    },
    remove: function (userId, doc) {
      return true;
      return userId;
    }
  });

  // Site settings
  Settings = new Meteor.Collection("settings");
  Meteor.publish('settings', function () {
    return Settings.find();
  });
  Settings.allow({
    insert: function (userId, doc) {
      return true;
      // the user must be logged in, and the document must be owned by the user

      // FIXME: For this and all other methods, return true only if admin role
      // return (userId && doc.owner === userId);
      return userId;
    },
    update: function (userId, doc, fields, modifier) {
      return true;
      return userId;
    },
    remove: function (userId, doc) {
      return true;
      return userId;
    }
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