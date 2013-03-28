// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.

Template.blog_post.name = 'Basic blog post';
Template.blog_post.description = 'A basic blog post block';

Template.blog_post.block = function () {
  var block_id = Session.get('curent_block');
  if (!block_id)
    return {title: 'Sorry, we couldn\'t find the requested block'};
  return Blocks.findOne({_id: block_id});
};
