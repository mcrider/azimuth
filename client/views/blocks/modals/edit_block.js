Template.edit_block.rendered = function() {
  Session.set('block-saved', false);
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
        icon: false,
        addclass: "stack-bottomright",
        stack: utils.pnotify_stack_bottomright
      });
    } else {
      $.pnotify({
        text: 'Error: Could not save block.',
        type: 'Error',
        icon: false,
        addclass: "stack-bottomright",
        stack: utils.pnotify_stack_bottomright
      });
    }

    // Add block to page
    if(Session.get('new-block-id')) {
      Session.set('new-block-id', false);
      var page = utils.getCurrentPage();

      if (block && !page.notFound) {
        var template = block.template;
        var label = Template[template].label || 'Single Block';
        PageBlocks.insert({page_id: page._id, block_id: block._id, label: label, zone: Session.get('block-zone'), added: Date.now()});
      }
    }

    // Set this so we don't have to run the 'hidden' event handler when we close the modal
    Session.set('block-saved', true);

    $('#editBlockModal').modal('hide');

  },
  'click .close-modal': function(e) {
    // Handle deletion of a newly created block: To avoid issues with meteor not
    //  displaying the modal after a new block is created (due to re-rendering issues),
    //  the block must be created first then added after the modal is closed
    var newBlockId = Session.get('new-block-id');
    if(!Session.get('block-saved') && newBlockId) {
      Blocks.remove(newBlockId);
    }
  }
};
