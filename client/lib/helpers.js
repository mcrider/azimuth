// Helpers (additional public functions) for Handlebars templates

// Display all blocks for a page in a given block zone
Handlebars.registerHelper('renderBlocks', function (options) {
  var zone = options.hash.zone;
  if (!zone) {
    console.log('Block zone not specified');
    return false;
  }

  // Get zone settings for paging and sorting
  var page = utils.getCurrentPage();
  var limit = page["zone_"+zone+"_limit"] ? page["zone_"+zone+"_limit"] : 0; // The number of blocks to show per 'page' of blocks
  var skip = Session.get("zone_"+zone+"_skip") ? Session.get("zone_"+zone+"_skip") * limit : 0; // The current 'page' of blocks

  if (limit > 0) {
    Template["block_display"].pageBlocks = PageBlocks.find({page_id: this._id, zone: zone}, {skip: skip, limit: limit});
  } else {
    Template["block_display"].pageBlocks = PageBlocks.find({page_id: this._id, zone: zone});
  }
  var numSets = limit > 0 ? Math.ceil(PageBlocks.find({page_id: this._id, zone: zone}).count() / limit) : false;
  Template["block_display"].numSets = numSets > 1 ? _.range(1, numSets + 1) : false;
  Template["block_display"].zone = zone;
  return Template["block_display"]();
});

// Display a block/blocks from a pageBlock
Handlebars.registerHelper('renderPageBlock', function (pageBlock) {
  var fragment = '';
  if (pageBlock.block_tag) {
    // Fetch blocks with a given tag and add to fragments
    Blocks.find({tag: pageBlock.block_tag}).forEach(function(block) {
      fragment = fragment.concat(utils.getBlockFragment(block));
    });
  } else if (pageBlock.block_type) {
    // Fetch each block with the given template (== type) and add to fragments
    Blocks.find({template: pageBlock.block_type}).forEach(function(block) {
      fragment = fragment.concat(utils.getBlockFragment(block));
    });
  } else {
    var block = Blocks.findOne(pageBlock.block_id);
    if (block && block.template) {
      Template[block.template].block = block;
      var fragment = Template[block.template](); // this calls the template and returns the HTML.
    } else {
      console.log('Block not found (or has no template specified)' );
    }
  }
  return fragment;
});

// Renders a single instance of a block
Handlebars.registerHelper('renderBlock', function (block) {
  if (block && block.template) {
    Template[block.template].block = block;
    var fragment = Template[block.template](); // this calls the template and returns the HTML.
  } else {
    console.log('Block not found (or has no template specified)' );
  }

  return fragment;
});

// Renders the header template (delaying load until site settings are available)
Handlebars.registerHelper('renderHeader', function (block) {
  if (settingsSubscription.ready()) {
    var fragment = Template['header'](); // this calls the template and returns the HTML.
    return fragment;
  } else {
    return '';
  }
});

// Renders the footer template (delaying load until site settings are available)
Handlebars.registerHelper('renderFooter', function (block) {
  if (settingsSubscription.ready()) {
    var fragment = Template['footer'](); // this calls the template and returns the HTML.
    return fragment;
  } else {
    return '';
  }
});

// Renders a form element using a template in views/form/
Handlebars.registerHelper("formHelper", function (options) {
  if(options.hash.type == 'wysiwyg') options.hash.uniqueId = options.hash.fieldName + '_' + Math.random().toString(36).substring(7);
  // FIXME: Return error if type not valid template
  return new Handlebars.SafeString(Template[options.hash.type](options.hash));
});

// Displays a region to manage blocks in the page edit template
Handlebars.registerHelper("blockZoneEditor", function (options) {
  // FIXME: Return error if type not valid template
  return new Handlebars.SafeString(Template['block_zone_editor'](options.hash));
});

// Get a setting value
Handlebars.registerHelper("humanReadableTime", function (timestamp) {
  return utils.displayHumanReadableTime(timestamp);
});

// Get a setting value
Handlebars.registerHelper("getSetting", function (settingName) {
  var settingValue = utils.getSetting(settingName);
  if (settingValue) return utils.getSetting(settingName);
	else return '';
});

// Get a boolean setting value (i.e. check a setting's truth value to determine to display block)
Handlebars.registerHelper("ifSetting", function (settingName, block) {
	var settings = Settings.findOne();
	if (!settings || !settingName) return false;
	if (settings[settingName] != false) return block(this);
});


// Return the current page object
Handlebars.registerHelper("page", function () {
  return utils.getCurrentPage();
});

// Return true if a page slug is the current page's page slug
Handlebars.registerHelper("ifCurrentPage", function (slug, block) {
  if (utils.getCurrentPage().template == slug) return block(this);
  else return false;
});

// Custom helper to meteor-roles package to test if user is an admin
Handlebars.registerHelper("ifAdmin", function (userId, block) {
  if (Roles.userIsInRole({_id: userId}, ['admin'])) return block(this);
  else return '';
});

// Custom helper to meteor-roles package to test if user is an admin
Handlebars.registerHelper("ifAuthor", function (userId, block) {
  if (Roles.userIsInRole({_id: userId}, ['author'])) return block(this);
  else return '';
});
