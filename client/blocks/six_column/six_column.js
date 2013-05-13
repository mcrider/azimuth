// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.

Template.six_column.label = '6 Column Block';
Template.six_column.description = 'A basic content block that takes up half a row';

// This important method hooks the template into the CMS
registry.blockTemplate({name: 'six_column', label: '6 Column Block'})