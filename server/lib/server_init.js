Meteor.startup(function () {
  Pages = new Meteor.Collection("pages");

  Pages.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user

    // FIXME: For this and all other methods, return true only if admin role
    // return (userId && doc.owner === userId);
    return userId;
  },
  update: function (userId, doc, fields, modifier) {
    return userId;
  },
  remove: function (userId, doc) {
    return userId;
  }
});

  if (Pages.find().count() === 0) {
    var data = [
      {
        title: "Home",
        slug: "home",
        contents: "<p>Welcome to this Meteor CMS website.</p><p>You can add pages from the menu above.</p>",
        template: "page_default"
      },
      {
        title: "About",
        slug: "about",
        contents: "<p>Replace this with some text about your site.</p>",
        template: "page_default"
      }
    ];

    for (var i = 0; i < data.length; i++) {
      Pages.insert({
        title: data[i].title,
        slug: data[i].slug,
        contents: data[i].contents,
        template: data[i].template
      });
    }
  }
});