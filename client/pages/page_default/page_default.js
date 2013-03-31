// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.

Template.page_default.name = 'Default Template';
Template.page_default.description = 'Basic one column layout';

Template.page_default.page = function() {
  return utils.getCurrentPage();
};
