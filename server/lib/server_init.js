Meteor.startup(function () {
  Pages = new Meteor.Collection("pages");

  if (Pages.find().count() === 0) {
    var data = [
      {
        title: "Home",
        slug: "home",
        contents: "<p>Welcome to this Meteor CMS website.</p><p>You can add pages from the menu above.</p>"
      },
      {
        title: "About",
        slug: "about",
        contents: "<p>Replace this with some text about your site.</p>"
      }
    ];

    for (var i = 0; i < data.length; i++) {
      Pages.insert({
        title: data[i].title,
        slug: data[i].slug,
        contents: data[i].contents
      });
    }
  }
});