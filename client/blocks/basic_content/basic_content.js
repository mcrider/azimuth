// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.

Template.basic_content.label = 'Basic content block';
Template.basic_content.description = 'A basic content block for arbitrary text/HTML';

// This important method hooks the template into the CMS
registry.blockTemplate({name: 'basic_content', label: 'Basic Content Block'})