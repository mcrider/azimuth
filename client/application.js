
// Template.hello.greeting = function () {
//   return "Welcome to Azimuth CMS.";
// };

// Template.hello.events({
//   'click input' : function () {
//     // template data, if any, is available in 'this'
//     if (typeof console !== 'undefined')
//       console.log("You pressed the button");
//   }
// });

Pages = new Meteor.Collection("pages");

// ID of currently selected page
Session.set('page_slug', null);

Meteor.subscribe('pages', function () {
  if (!Session.get('page_slug')) {
    var page = Pages.findOne({}, {sort: {name: 1}});
    if (page)
      Router.setPage(page.slug);
  }
});

Template.header.pages = function () {
  return Pages.find({});
};

Template.header.events = {
  'click .add-page': function () {
    $('#addNewPageModal').modal('show');
  },
  'click .submit-new-page': function () {
    var raw_title = $('.page-title-textfield').val();
    var raw_slug = $('.page-slug-textfield').val();
    $('#addNewPageModal').modal('hide');
    // TODO: put in validation
    Pages.insert({
      title: raw_title,
      slug: raw_slug,
      contents: "<p>This page is empty.</p>"
    });
  },
  'keyup .page-title-textfield': function () {
    var raw_title = $('.page-title-textfield').val();
    raw_title = _.slugify(raw_title);
    $('.page-slug-textfield').val(raw_title);
  }
};

Template.page_content.page = function () {
  var page_slug = Session.get('page_slug');
  if (!page_slug)
    return {title: 'Error, no page found'};
  return Pages.findOne({slug: page_slug});
};

var PageRouter = Backbone.Router.extend({
  routes: {
    ":page_slug": "main"
  },
  main: function (page_slug) {
    Session.set("page_slug", page_slug);
  },
  setPage: function (page_slug) {
    this.navigate(page_slug, true);
  }
});

Router = new PageRouter;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});