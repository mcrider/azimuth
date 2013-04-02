Template.page_edit_layout.page = function () {
  return utils.getCurrentPage();
};

Template.page_edit_layout.created = function () {
  var page = utils.getCurrentPage();
  // Insert the page's edit form fields
  fragment = Meteor.render(function () {
    template = page.template ? page.template : 'page_default';
    return Template[ template + "_edit" ](); // this calls the template and returns the HTML.
  });
  $("#pageEditCustomFields").html(fragment);

}