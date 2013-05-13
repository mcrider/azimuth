// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.

Template.three_column.label = '3 Column Block';
Template.three_column.description = 'A basic content block that takes up 1/4 of a row';

// This important method hooks the template into the CMS
registry.blockTemplate({name: 'three_column', label: '3 Column Block'})