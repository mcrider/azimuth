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
    return false;
  },
  'click .editBlockButton': function() {
    alert('bar');
    return false;
  }
};