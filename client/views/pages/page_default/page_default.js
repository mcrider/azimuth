// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.

Template.page_default.name = 'Default Template';
Template.page_default.description = 'Basic one column layout';

Template.page_default.fields = {
  title: 'text',
  contents: 'textarea'
};

Template.page_default.events = {
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

Template.page_default.page = function () {
  var page_slug = Session.get('page_slug');
  if (!page_slug)
    return {title: 'Sorry, we couldn\'t find the requested page'};
  return Pages.findOne({slug: page_slug});
};