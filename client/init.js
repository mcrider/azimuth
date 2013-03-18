/* init.js
 *
 * Startup code for the front-end.
 *
 */

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

