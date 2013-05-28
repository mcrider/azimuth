// Accompanying JS file for the page edit template.
// Describes the page's metadata and actions.

Template.sidebar_left_edit.events = {
  'submit #pageEditForm': events.savePage,
  'click #deletePage': events.showDeletePageModal,
  'click .delete-page': events.deletePage
};
