// Common event handlers

events = {
  savePage: function (e) {
    debugger;
    var pageData = utils.getFormValues("#pageEditForm");
    e.preventDefault();
    Pages.update({_id: this._id}, {$set: pageData});
    $.pnotify({
      text: 'Your page changes were saved.',
      type: 'success',
      icon: false
    });
  },
  showDeletePageModal: function () {
    $('#deletePageModal').modal('show');
    return false;
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
      icon: false
    });
  },
  showNewBlockModal: function (e) {
    var zone = $(e.currentTarget).parent().parent().data('zone')
    var template = this.name;
    var fragment = Meteor.render(function () {
      Template[ template + "_edit" ].block = {}; // Add some blank data so the edit fields display
      return Template[ template + "_edit" ](); // this calls the template and returns the HTML.
    });
    Session.set('block_template', template);
    Session.set('block_zone', zone);
    $('#blockModal .modal-body').html(fragment);
    $('#blockModal').modal('show');
    return false;
  },
  saveNewBlock: function () {
    // Create the block
    var blockData = utils.getFormValues("#blockEditForm");
    blockData.created = Date.now();
    blockData.template = Session.get('block_template');

    var block_id = Blocks.insert(blockData);
    var page = utils.getCurrentPage();

    if(!Template[blockData.template] || !Session.get('block_zone')) {
      console.log("Block template not found or block zone not specified");
      return false;
    }

    var label = Template[blockData.template].label || 'Single Block';
    // Attach the block to the page
    if (!page.notFound) {
      Pages.update({_id: page._id}, {$addToSet: {blocks: {id: block_id, label: label, zone: Session.get('block_zone'), added: Date.now()}}});
    }
    $('#blockModal').modal('hide');

    $.pnotify({
      text: label + ' added to page.',
      type: 'success',
      icon: false
    });

    return true;
  }
};