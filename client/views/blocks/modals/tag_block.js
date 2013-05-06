Template.tag_block.events = {
  'click .add-block-by-tag': function(e) {
    var tag = $('#tag').val()
    $('#blockTagModal').modal('hide');

    if (tag) {
      var page = utils.getCurrentPage();
      var zone = $(e.currentTarget).closest('#blockTagModal').data('zone');

      // Attach the block to the page
      if (!page.notFound) {
        Pages.update({_id: page._id}, {$addToSet: {blocks: {tag: tag, label: tag, zone: zone, added: Date.now()}}});
      }

      $.pnotify({
        text: 'Blocks with tag' + tag + ' added to page.',
        type: 'success',
        icon: false
      });
    }

    return false;
  }
};
