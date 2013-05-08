Template.edit_block.rendered = function() {
  // Handle deletion of a newly created block: To avoid issues with meteor not 
  //  displaying the modal after a new block is created (due to re-rendering issues), 
  //  the block must be created first then added after the modal is closed
  Session.set('block-saved', false);
  $(this.firstNode).on('hidden', function() {
    var newBlockId = Session.get('new-block-id');
    if(!Session.get('block-saved') && newBlockId) {
      Blocks.remove(newBlockId);
    }
  });
}

Template.edit_block.events = {
  'click .edit-block-confirm': function(e) {
    e.preventDefault();
    var block = Blocks.findOne({_id: Session.get('block-edit-id')});
    if(block) {
      var blockData = utils.getFormValues("#editBlockForm");
      Blocks.update({_id: block._id}, {$set: blockData});
      $.pnotify({
        text: 'Block Saved.',
        type: 'success',
        icon: false
      });
    } else {
      $.pnotify({
        text: 'Error: Could not save block.',
        type: 'Error',
        icon: false
      });
    }

    $('#editBlockModal').modal('hide');

    // Add block to page
    if(Session.get('new-block-id')) {
      var page = utils.getCurrentPage();
      var label = Template[template].label || 'Single Block';
      if (!page.notFound) {
        Pages.update({_id: page._id}, {$addToSet: {blocks: {id: block._id, label: label, zone: Session.get('block-zone'), added: Date.now()}}});
      }  
    }
    
    // Set this so we don't have to run the 'hidden' event handler
    Session.set('block-saved', true);
  }
};
