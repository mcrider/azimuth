// Accompanying JS file for the header template.
// Describes the page's metadata and actions.

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