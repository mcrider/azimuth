Template.block_zone_editor.added = function() {
  if(this.added) return utils.displayHumanReadableTime(this.added);
  else return '';
};

Template.block_zone_editor.events = {
  'click .delete-block-button': function() {
    $('#delete-block-modal').modal('show');
    return false;
  },
  'click .delete-block-confirm': function() {
    $('#delete-block-modal').modal('hide');
    page = utils.getCurrentPage();
    Pages.update({ _id : page._id }, {$pull : {  "blocks" : { id: this.id }}});
    $.pnotify({
      text: 'Block removed from page.',
      type: 'success',
      icon: false
    });
    return false;
  },
  'click .edit-block-button': function() {
    var block = Blocks.findOne({_id: this.id});
    var fragment = Meteor.render(function () {
      // template = page.template ? page.template : 'page_default';
      Template[ block.template + "_edit" ].block = block;
      return Template[ block.template + "_edit" ](block); // this calls the template and returns the HTML.
    });
    $('#editBlockModal .modal-body').html(fragment);
    $('#editBlockModal').modal('show');
    return false;
  },
  'click .edit-block-confirm': function() {
    $('#editBlockModal').modal('hide');
    var blockData = utils.getFormValues("#blockEditForm");
    Blocks.update({_id: this.blocks[0].id}, {$set: blockData});
    $.pnotify({
      text: 'Block Saved.',
      type: 'success',
      icon: false
    });
    return false;
  }
};