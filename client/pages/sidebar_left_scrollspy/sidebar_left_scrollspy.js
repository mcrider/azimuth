// Accompanying JS file for the page template.
// Describes the page's metadata and actions.


Template.sidebar_left_scrollspy.label = 'Sidebar on Left with Scrollspy Nav';
Template.sidebar_left_scrollspy.description = 'Basic two column layout with left-hand sidebar containing a scrollspy navigation';

// This important method hooks the template into the CMS
registry.pageTemplate({name: 'sidebar_left_scrollspy', label: 'Sidebar on Left with Scrollspy'});

Template.sidebar_left_scrollspy.rendered = function() {
  $('body').scrollspy();
}