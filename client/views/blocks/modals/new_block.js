Template.new_block.events = {
  'click .save-new-block': function (e) {
    // Create the block
    debugger;
    var blockData = utils.getFormValues("#newBlockForm");
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
