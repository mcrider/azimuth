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
  }
};
