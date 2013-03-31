Meteor.startup(function () {


  // TODO: If user count is 0, create admin user



  Pages = new Meteor.Collection("pages");

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
    var pageData = [{
        title: "Home",
        slug: "home",
        contents: "<p>Welcome to Azimuth.</p><p>You can add pages from the <i class='icon-cogs'></i>  menu above.</p>",
        template: "page_default"
      },
      {
        title: "About",
        slug: "about",
        contents: "<p>Replace this with some text about your site.</p>",
        template: "page_default"
      }
    ];

    for (var i = 0; i < pageData.length; i++) {
      Pages.insert({
        title: pageData[i].title,
        slug: pageData[i].slug,
        contents: pageData[i].contents,
        template: pageData[i].template
      });
    }
  }

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

  if (Blocks.find().count() === 0) {
    var blockData = [{
        title: "Home",
        contents: "<p>Blog post one</p>",
        template: "blog_post"
      },
      {
        title: "Home",
        contents: "<p>Blog post dos</p>",
        template: "blog_post"
      }
    ];

    for (var j = 0; j < blockData.length; j++) {
      Blocks.insert({
        title: blockData[j].title,
        contents: blockData[j].contents,
        template: blockData[j].template
      });
    }
  }
});