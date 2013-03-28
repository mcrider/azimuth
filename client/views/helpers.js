// Helpers (additional public functions) for Handlebars templates

Handlebars.registerHelper('renderBlocksForDisplay',function(id, options) {
  block = Blocks.findOne({ _id: id });
  if (!block) return 'Sorry, we couldn\'t find the requested block';
  Session.set('curent_block', id);

  template = block.template ? block.template : 'blog_post';
  var fragment = Template[ template ](); // this calls the template and returns the HTML.

  return fragment;
});