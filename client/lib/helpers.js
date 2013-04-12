// Helpers (additional public functions) for Handlebars templates

Handlebars.registerHelper('renderBlockForDisplay', function (id) {
  block = Blocks.findOne({ _id: id });
  if (!block) return 'Sorry, we couldn\'t find the requested block';

  // Fixme: Use first block template as default (return error if none exist)
  template = block.template ? block.template : 'blog_post';
  Template[template].block = block;
  var fragment = Template[template](); // this calls the template and returns the HTML.

  return fragment;
});

Handlebars.registerHelper("formHelper", function (options) {
  // FIXME: Return error if type not valid template
  return new Handlebars.SafeString(Template[options.hash.type](options.hash));
});

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

Handlebars.registerHelper("ifCurrentPage", function (slug, block) {
  if (utils.getCurrentPage().template == slug) return block(this);
  else return false;
});