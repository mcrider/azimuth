Template.delete_block.events = {
  // Delete only a pageBlock (the actual blocks are kept)
  'click .delete-block-confirm': function(e) {
    e.preventDefault();
    $('#deleteBlockModal').modal('hide');

    var type = Session.get('block-edit-type');
    var id = Session.get('block-edit-id');
    page = utils.getCurrentPage();

    var pageBlocks = null;
    if (type == 'block_type') pageBlocks = PageBlocks.find({ page_id : page._id, block_type: id });
    else if (type == 'block_tag') pageBlocks = PageBlocks.find({ page_id : page._id, block_tag: id });
    else pageBlocks = PageBlocks.find({ page_id : page._id, block_id: id });

    pageBlocks.forEach(function(pageBlock) {
      PageBlocks.remove(pageBlock._id);
    });

    $.pnotify({
      text: 'Block removed from page.',
      type: 'success',
      icon: false,
      addclass: "stack-bottomright",
      stack: utils.pnotify_stack_bottomright
    });
  },
  // Delete a pageBlock and the corresponding block
  'click .delete-all-blocks-confirm': function(e) {
    e.preventDefault();
    $('#deleteBlockModal').modal('hide');

    var type = Session.get('block-edit-type');
    var id = Session.get('block-edit-id');

    if (type == 'id') {
      PageBlocks.find({block_id: id}).forEach(function(pageBlock) {
        PageBlocks.remove(pageBlock._id);
      });
      Blocks.remove(id);
      $.pnotify({
        text: 'Block deleted.',
        type: 'success',
        icon: false,
        addclass: "stack-bottomright",
        stack: utils.pnotify_stack_bottomright
      });
    } else {
      $.pnotify({
        text: 'There was an error trying to delete this block.',
        type: 'warning',
        icon: false,
        addclass: "stack-bottomright",
        stack: utils.pnotify_stack_bottomright
      });
    }
  }
};
