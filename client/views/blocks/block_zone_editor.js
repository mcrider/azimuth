Template.block_zone_editor.added = function() {
  if(this.added) return utils.displayHumanReadableTime(this.added);
  else return '';
};

Template.block_zone_editor.events = {
  'click .deleteBlockButton': function() {
    page = utils.getCurrentPage();
    // 'this' is the pageBlock, delete from current page
    Pages.update({ _id : page._id }, {$pull : {  "blocks" : { id: this.id }}});
    return false;
  },
  'click .editBlockButton': function() {
    alert('bar');
    return false;
  }
};