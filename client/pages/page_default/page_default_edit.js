// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.

Template.page_default_edit.events = {
  'submit #pageEditForm': events.savePage,
  'click #deletePage': events.showDeletePageModal,
  'click .delete-page': events.deletePage,
  'click .new-block': events.showNewBlockModal,
  'click .save-block': events.saveNewBlock
};


/// FIXME:  MAKE THIS A HANDLEBARS HELPER (register helper for 'currentPage' and use in all templates)
Template.page_default_edit.page = function () {
  return utils.getCurrentPage();
};