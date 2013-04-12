// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.

Template.blog_post.label = 'Basic blog post';
Template.blog_post.description = 'A basic blog post block';

// This important method hooks the template into the CMS
registry.blockTemplate({name: 'blog_post', label: 'Basic Blog Post'})