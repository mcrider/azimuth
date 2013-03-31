// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.

Template.page_default_edit.events = {
  'submit #pageEditForm': function (e) {
    var pageData = utils.getFormValues("#pageEditForm");
    e.preventDefault();
    Pages.update({_id: this._id}, {$set: pageData});
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
    var page = utils.getCurrentPage();
    var title = page.title;
    $('#deletePageModal').modal('hide');

    Router.setPage(Pages.findOne().slug);

    Pages.remove(page._id);

    $.pnotify({
      text: '"' + title + '" was successfully deleted.',
      type: 'success',
      icon: false
    });
  },
  'click .newBlock': function () {
    var fragment = Meteor.render(function () {
      // template = page.template ? page.template : 'page_default';
      return Template[ "blog_post_edit" ](); // this calls the template and returns the HTML.
    });
    $('#blockModal .modal-body').html(fragment);
    $('#blockModal').modal('show');
    return false;
  },
  'click .save-block': function () {
    // Create the block
    var blockData = utils.getFormValues("#blockEditForm");
    blockData.created = Date.now();

    var block_id = Blocks.insert(blockData);

    var label = Template[blockData.template].label || 'Single Block';
    // Attach the block to the page
    // FIXME: Deny if user isn't  > author
    var page = utils.getCurrentPage();
    if (!page.notFound) {
      Pages.update({_id: page._id}, {$addToSet: {blocks: {id: block_id, label: label}}});
    }
    $('#blockModal').modal('hide');

    return true;
  }
};


/// FIXME:  MAKE THIS A HANDLEBARS HELPER
Template.page_default_edit.page = function () {
  return utils.getCurrentPage();
};