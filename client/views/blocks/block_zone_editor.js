Template.block_zone_editor.rendered = function() {
  var saveOrder = function() {
    // var data = $(".block-zone li").map(function() { return $(this).children().html(); }).get();
    // $("input[name=list1SortOrder]").val(data.join("|"));
  };

  $(this.firstNode).find("ul.block-zone").dragsort({ 
    dragSelector: "li", 
    dragEnd: saveOrder, 
    dragSelectorExclude: ".ops", 
    placeHolderTemplate: "<li class='placeHolder'><div></div></li>" 
  });
}

Template.block_zone_editor.added = function() {
  if(this.added) return utils.displayHumanReadableTime(this.added);
  else return '';
};

Template.block_zone_editor.events = {
  'click .new-block': function (e) {
    e.preventDefault();
    var zone = $(e.currentTarget).closest('.block-zone-container').data('zone')
    var template = this.name;
    Session.set('block-template', template);
    Session.set('block-zone', zone);

    var blockData = {};
    blockData.created = Date.now();
    blockData.template = template;

    var block_id = Blocks.insert(blockData);
    var block = Blocks.findOne({_id: block_id});
    Session.set('new-block-id', block_id);

    var fragment = Meteor.render(function () {
      Template[ block.template + "_edit" ].block = block;
      return Template[ block.template + "_edit" ](block); // this calls the template and returns the HTML.
    });
    $('#editBlockModal').first().find('.modal-body').html(fragment);
    Session.set('block-edit-id', block_id);
    $('#editBlockModal').first().modal('show');
  },
  'click .existing-block': function(e) {
  	e.preventDefault();
    var zone = $(e.currentTarget).closest('.block-zone-container').data('zone');
    Session.set('block-zone', zone);
    $('#existingBlockModal').modal('show');
  },
  'click .block-by-tag': function(e) {
  	e.preventDefault();
    var zone = $(e.currentTarget).closest('.block-zone-container').data('zone');
    Session.set('block-zone', zone);
    $('#blockTagModal').modal('show');
  },
  'click .block-by-type': function(e) {
  	e.preventDefault();
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
  },
  'click .delete-block-button': function(e) {
  	e.preventDefault();
    Session.set('block-edit-id', $(e.currentTarget).closest('.edit-block').data('id'));
    Session.set('block-edit-type', $(e.currentTarget).closest('.edit-block').data('type'));

    if(Session.get('block-edit-type') == 'id') {
      $("#deleteBlockModal .delete-all-blocks-confirm").show();
    } else {
      $("#deleteBlockModal .delete-all-blocks-confirm").hide();
    }
    $('#deleteBlockModal').modal('show');
  },
  'click .edit-block-button': function(e) {
  	e.preventDefault();
    var block = Blocks.findOne({_id: this.id});
    var fragment = Meteor.render(function () {
      Template[ block.template + "_edit" ].block = block;
      return Template[ block.template + "_edit" ](block); // this calls the template and returns the HTML.
    });
    $('#editBlockModal').first().find('.modal-body').html(fragment);
    Session.set('block-edit-id', block._id);
    $('#editBlockModal').first().modal('show');
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