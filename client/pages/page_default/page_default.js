// Accompanying JS file for the page template.
// Describes the page's metadata and actions.

Template.page_default.label = 'Default Template';
Template.page_default.description = 'Basic one column layout';

// This important method hooks the template into the CMS
registry.pageTemplate({name: 'page_default', label: 'Default'})
