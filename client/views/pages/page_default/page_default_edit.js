// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.

Template.page_default_edit.events = {
  'submit #pageEditForm': function (e) {
    page = {};
    for (var attrname in this) {
      if(attrname != '_id') page[attrname] = $('#'+attrname).val();
    }
    e.preventDefault();
    Pages.update({_id: this._id}, {$set: page});
    return false;
  }
};

Template.page_default_edit.page = function () {
  var page_slug = Session.get('page_slug');
  if (!page_slug)
    return {title: 'Sorry, we couldn\'t find the requested page'};
  return Pages.findOne({slug: page_slug});
};