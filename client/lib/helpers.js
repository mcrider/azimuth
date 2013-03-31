// Helpers (additional public functions) for Handlebars templates

Handlebars.registerHelper('renderBlockForDisplay', function(id) {
  block = Blocks.findOne({ _id: id });
  if (!block) return 'Sorry, we couldn\'t find the requested block';

  template = block.template ? block.template : 'blog_post';
  Template[template].block = block;
  var fragment = Template[template](); // this calls the template and returns the HTML.

  return fragment;
});

