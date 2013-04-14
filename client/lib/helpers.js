// Helpers (additional public functions) for Handlebars templates

// Display all blocks for a page in a given block zone
Handlebars.registerHelper('renderBlocks', function (options) {
  var pageBlocks =  _.where(this.blocks, {zone: options.hash.zone});

  var fragments = '';
  _.each(pageBlocks, function(pageBlock) {
    block = Blocks.findOne({ _id: pageBlock.id });
    if (block && block.template) {
      // FIXME: Check if we are trying to display blocks by id, type, or tag

      if(!block.template) {
        console.log("No template specified for block " + id);
        return false;
      }

      Template[block.template].block = block;
      var fragment = Template[block.template](); // this calls the template and returns the HTML.
      fragments = fragments.concat(fragment);
    } else {
      console.log('Block ' + pageBlock.id + ' not found (or has no template specified)' );
    }
  });
 
  return fragments;
});

// Renders a form element using a template in views/form/
Handlebars.registerHelper("formHelper", function (options) {
  // FIXME: Return error if type not valid template
  return new Handlebars.SafeString(Template[options.hash.type](options.hash));
});

// Displays a region to manage blocks in the page edit template
Handlebars.registerHelper("blockZoneEditor", function (options) {
  // FIXME: Return error if type not valid template
  return new Handlebars.SafeString(Template['block_zone_editor'](options.hash));
});

// Get a setting value
Handlebars.registerHelper("getSetting", function (settingName) {
	var settings = Settings.findOne();
	if (!settings || !settingName) return false;
	return Settings.findOne()[settingName];
});

// Get a boolean setting value (i.e. check a setting's truth value to determine to display block)
Handlebars.registerHelper("ifSetting", function (settingName, block) {
	var settings = Settings.findOne();
	if (!settings || !settingName) return false;
	if (Settings.findOne()[settingName] == true) return block(this);
});

// Return true if a page slug is the current page's page slug
Handlebars.registerHelper("ifCurrentPage", function (slug, block) {
  if (utils.getCurrentPage().template == slug) return block(this);
  else return false;
});