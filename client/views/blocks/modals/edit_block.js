Template.edit_block.events = {
  'click .edit-block-confirm': function() {
    var block = Blocks.findOne({_id: Session.get('block-edit-id')});
    if(block) {
      debugger;
      var blockData = utils.getFormValues("#blockEditForm");
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
    return false;
  }
};
