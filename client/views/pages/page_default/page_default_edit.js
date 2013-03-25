// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.

Template.page_default_edit.events = {
  'submit #pageEditForm': function (e) {
    page = {};
    for (var attrname in this) {
      if(attrname != '_id') page[attrname] = $('#'+attrname).val();
    }
    e.preventDefault();
    Pages.update({_id: this._id}, {$set: page});
    $.pnotify({
      text: 'Your page changes were saved.',
      type: 'success',
      icon: false
    });
  },
  'click #deletePage': function () {
    $('#deletePageModal').modal('show');
    return false;
  },
  'click .delete-page': function () {
    var page = Pages.findOne({slug: Session.get('page_slug')});
    var title = page.title;
    $('#deletePageModal').modal('hide');

    Router.setPage(Pages.findOne().slug);

    Pages.remove(page._id);

    $.pnotify({
      text: '"' + title + '" was successfully deleted.',
      type: 'success',
      icon: false
    });
  }
};

Template.page_default_edit.page = function () {
  var page_slug = Session.get('page_slug');
  if (!page_slug)
    return {title: 'Sorry, we couldn\'t find the requested page'};
  return Pages.findOne({slug: page_slug});
};