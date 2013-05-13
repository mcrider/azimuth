// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.

Template.two_column.label = '2 Column Block';
Template.two_column.description = 'A basic content block that takes up a sixth of a row';

// This important method hooks the template into the CMS
registry.blockTemplate({name: 'two_column', label: '2 Column Block'})