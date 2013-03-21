// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.

Template.edit.events = {
  'submit #pageEditForm': function (e) {
    e.preventDefault();
    var page = Template.edit.page();
    var pageData = {};
    $("#pageEditForm input[type='text'], #pageEditForm textarea").each(function() {
      pageData[$(this).attr('id')] = $(this).val();
    });
    Pages.update({_id: Pages.findOne({slug: "home"})._id}, {$set: pageData});
    return false;
  }
};

Template.edit.page = function () {
  var page_slug = Session.get('page_slug');
  if (!page_slug)
    return {title: 'Sorry, we couldn\'t find the requested page'};
  return Pages.findOne({slug: page_slug});
};