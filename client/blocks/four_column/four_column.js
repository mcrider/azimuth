// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.

Template.four_column.label = '4 Column Block';
Template.four_column.description = 'A basic content block that takes up 1/3 of a row';

// This important method hooks the template into the CMS
registry.blockTemplate({name: 'four_column', label: '4 Column Block'})