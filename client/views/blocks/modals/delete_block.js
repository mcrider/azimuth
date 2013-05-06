Template.delete_block.events = {
  'click .delete-block-confirm': function() {
    $('#deleteBlockModal').modal('hide');

    var type = Session.get('block-edit-type');
    var id = Session.get('block-edit-id');
    page = utils.getCurrentPage();

    var showSuccess = function() {
      $.pnotify({
        text: 'Block removed from page.',
        type: 'success',
        icon: false
      });  
    }

    if (type == 'id') {
      Pages.update({ _id : page._id }, {$pull : {  "blocks" : { id: id }}});
      showSuccess();
    } else if (type == 'type') {
      Pages.update({ _id : page._id }, {$pull : {  "blocks" : { type: id }}});
      showSuccess();
    } else if (type == 'tag') {
      Pages.update({ _id : page._id }, {$pull : {  "blocks" : { tag: id }}});
      showSuccess();
    } else {
      $.pnotify({
        text: 'This block could not be removed from the page.',
        type: 'warning',
        icon: false
      });  
    }
    
    return false;
  },
  'click .delete-all-blocks-confirm': function() {
    $('#deleteBlockModal').modal('hide');

    var type = Session.get('block-edit-type');
    var id = Session.get('block-edit-id');

    if (type == 'id') {
      Pages.find().forEach(function(page) {
        Pages.update({ _id : page._id }, {$pull : {  "blocks" : { id: id }}});
      });
      Blocks.remove(id);
      $.pnotify({
        text: 'Block deleted.',
        type: 'success',
        icon: false
      });
    } else {
      $.pnotify({
        text: 'There was an error trying to delete this block.',
        type: 'warning',
        icon: false
      });  
    }
    
    return false;
  }
};
