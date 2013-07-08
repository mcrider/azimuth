Template.tag_block.events = {
  'click .add-block-by-tag': function(e) {
  	e.preventDefault();
    var tag = $('#tag').val()
    $('#blockTagModal').modal('hide');

    if (tag) {
      var page = utils.getCurrentPage();
      var zone = Session.get('block-zone');

      // Attach the block to the page
      if (!page.notFound) {
        PageBlocks.insert({page_id: page._id, block_tag: tag, label: tag, zone: zone, added: Date.now()});
      }

      $.pnotify({
        text: 'Blocks with tag "' + tag + '" added to page.',
        type: 'success',
        icon: false,
        addclass: "stack-bottomright",
        stack: utils.pnotify_stack_bottomright
      });
    }
  }
};
