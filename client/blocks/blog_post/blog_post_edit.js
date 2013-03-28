// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.

Template.page_default_edit.block = function () {
  var page_slug = Session.get('page_slug');
  if (!page_slug)
    return {title: 'Sorry, we couldn\'t find the requested page'};
  return Pages.findOne({slug: page_slug});
};