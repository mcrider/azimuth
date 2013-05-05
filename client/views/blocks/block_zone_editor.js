Template.block_zone_editor.rendered = function() {
  var saveOrder = function() {
    // var data = $(".block-zone li").map(function() { return $(this).children().html(); }).get();
    // $("input[name=list1SortOrder]").val(data.join("|"));
  };

  $("ul.block-zone").dragsort({ 
    dragSelector: "li", 
    dragEnd: saveOrder, 
    dragSelectorExclude: ".ops", 
    placeHolderTemplate: "<li class='placeHolder'><div></div></li>" 
  });

  $('.preview-block').popover({
    content: function() {
      $('.preview-block').not(this).popover('hide');
      return $(this).find('.block-preview').html(); },
    trigger: "click",
    html: "true",
    placement: "left"
  });
}

Template.block_zone_editor.added = function() {
  if(this.added) return utils.displayHumanReadableTime(this.added);
  else return '';
};

Template.block_zone_editor.events = {
  'click .new-block': function (e) {
    var zone = $(e.currentTarget).closest('.block-zone-container').data('zone')
    var template = this.name;
    var fragment = Meteor.render(function () {
      Template[ template + "_edit" ].block = {}; // Add some blank data so the edit fields display
      return Template[ template + "_edit" ](); // this calls the template and returns the HTML.
    });
    Session.set('block_template', template);
    Session.set('block_zone', zone);
    $('#blockModal .modal-body').html(fragment);
    $('#blockModal').modal('show');
    return false;
  },
  'click .save-new-block': function (e) {
    // Create the block
    var blockData = utils.getFormValues("#blockEditForm");
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
  },
  'click .existing-block': function(e) {
    var zone = $(e.currentTarget).closest('.block-zone-container').data('zone');
    Session.set('block_zone', zone);
    $('#existingBlockModal').modal('show');
    return false;
  },
  'click .add-existing-block': function(e) {
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

    return false;
  },
  'click .block-by-tag': function(e) {
    $('#blockTagModal').modal('show');
    return false;
  },
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
  },
  'click .block-by-type': function(e) {
    var template = this.name;
    var page = utils.getCurrentPage();
    var zone = $(e.currentTarget).closest('.block-zone-container').data('zone');
    var label = Template[template].label || 'Single Block';

    // Attach the block to the page
    if (!page.notFound) {
      Pages.update({_id: page._id}, {$addToSet: {blocks: {type: this.name, label: label, zone: zone, added: Date.now()}}});
    }

    $.pnotify({
      text: label + ' blocks added to page.',
      type: 'success',
      icon: false
    });

    return false;
  },
  'click .delete-block-button': function(e) {
    Session.set('block-edit-id', $(e.currentTarget).closest('.edit-block').data('id'));
    Session.set('block-edit-type', $(e.currentTarget).closest('.edit-block').data('type'));

    if(Session.get('block-edit-type') == 'id') {
      $("#deleteBlockModal .delete-all-blocks-confirm").show();
    } else {
      $("#deleteBlockModal .delete-all-blocks-confirm").hide();
    }
    $('#deleteBlockModal').modal('show');
    return false;
  },
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
  },
  'click .edit-block-button': function() {
    var block = Blocks.findOne({_id: this.id});
    var fragment = Meteor.render(function () {
      Template[ block.template + "_edit" ].block = block;
      return Template[ block.template + "_edit" ](block); // this calls the template and returns the HTML.
    });
    $('#editBlockModal .modal-body').html(fragment);
    Session.set('block-edit-id', block._id);
    $('#editBlockModal').modal('show');
    return false;
  },
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

Template.block_zone_editor.blocks = function() {
  var blocks = utils.getCurrentPage().blocks;
  // Get blocks with the correct zone (specified by this.zone)
  if(!this.zone) {
    console.log("You must specify a block zone for this helper");
    return false;
  }
  return _.where(blocks, {zone: this.zone});
}

Template.block_zone_editor.allBlocks = function() {
  return Blocks.find();
}

Template.block_zone_editor.templates = function() {
  return registry.blockTemplates;
}