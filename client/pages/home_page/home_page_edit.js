// Accompanying JS file for the page edit template.
// Describes the page's metadata and actions.

Template.home_page_edit.events = {
  'submit #pageEditForm': events.savePage,
  'click #deletePage': events.showDeletePageModal,
  'click .delete-page': events.deletePage
};
