Template.existing_block.rendered = function() {
  $('.preview-block').popover({
    content: function() {
      $('.preview-block').not(this).popover('hide');
      return $(this).find('.block-preview').html(); },
    trigger: "click",
    html: "true",
    placement: "left"
  });
}

Template.existing_block.events = {
  'click .add-existing-block': function(e) {
  	e.preventDefault();
    var page = utils.getCurrentPage();

    var label = Template[this.template].label || 'Single Block';
    // Attach the block to the page
    if (!page.notFound) {
      Pages.update({_id: page._id}, {$addToSet: {blocks: {id: this._id, label: label, zone: Session.get('block_zone'), added: Date.now()}}});
    }

    $('#existingBlockModal').modal('hide');
    $.pnotify({
      text: label + ' added to page.',
      type: 'success',
      icon: false
    });
  }
};
