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
    $('#blockModal').modal('hide');
debugger;
    // Create the block
    var title = $('#blockModal #title').val();
    var contents = $('#blockModal #contents').val();
    var block_id = Blocks.insert({
      title: title,
      contents: contents,
      created: Date.now(),
      template: "blog_post" // FIXME: Get this from a dropdown in the modal (and custom data)
    });

    // Attach the block to the page
    var page_slug = Session.get("page_slug");
    // TODO: Deny if user isn't  > author
    var page = Pages.findOne({slug: page_slug});
    if (page) {
      Pages.update({_id: page._id}, {$addToSet: {blocks: {id: block_id, label: 'Blog Post'}}});
    }

    return true;
  }
};


/// FIXME:  MAKE THIS A HANDLEBARS HELPER
Template.page_default_edit.page = function () {
  return utils.getCurrentPage();
};