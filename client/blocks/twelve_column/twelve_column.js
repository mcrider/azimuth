// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.

Template.twelve_column.label = '12/12 Column Block';
Template.twelve_column.description = 'A basic content block that takes up a full row';

// This important method hooks the template into the CMS
registry.blockTemplate({name: 'twelve_column', label: '12 Column Block'})