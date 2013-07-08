// Common event handlers

events = {
  savePage: function (e) {
    var pageData = utils.getFormValues("#pageEditForm");
    e.preventDefault();
    Pages.update({_id: this._id}, {$set: pageData});
    $.pnotify({
      text: 'Your page changes were saved.',
      type: 'success',
      icon: false,
      addclass: "stack-bottomright",
			stack: utils.pnotify_stack_bottomright
    });
  },
  showDeletePageModal: function (e) {
  	e.preventDefault();
    $('#deletePageModal').modal('show');
  },
  deletePage: function () {
    var page = utils.getCurrentPage();
    var title = page.title;
    $('#deletePageModal').modal('hide');

    // Delete from navs
    Navigation.find().forEach(function(nav) {
      if(nav._id) Navigation.update({ _id: nav._id }, {$pull : {  "pages" : { slug: page.slug }}});
    });

    Meteor.Router.to('/');
    Pages.remove(page._id);

    $.pnotify({
      text: '"' + title + '" was successfully deleted.',
      type: 'success',
      icon: false,
      addclass: "stack-bottomright",
      stack: utils.pnotify_stack_bottomright
    });
  }
};