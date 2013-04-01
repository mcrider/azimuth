// Helpers (additional public functions) for Handlebars templates

Handlebars.registerHelper('renderBlockForDisplay', function(id) {
  block = Blocks.findOne({ _id: id });
  if (!block) return 'Sorry, we couldn\'t find the requested block';

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