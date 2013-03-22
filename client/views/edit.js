// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.

Template.edit.events = {
  // 'keyup input': function(e) {
  //   e.preventDefault();
  //   var page = Template.edit.page();
  //   var setting = {};
  //   debugger;
  //   var attr = $(this).attr('id');
  //   var val = $(this).val();
  //   setting[attr] = val;

  //   Pages.update({_id: Pages.findOne({slug: "home"})._id}, {$set: { attr: val }});
  //   return false;
  // },
  'submit #pageEditForm': function (e) {
    page = {};
    for (var attrname in this) {
      if(attrname != '_id') page[attrname] = $('#'+attrname).val(); // Clone this without _id (which we can't save)
    }
    e.preventDefault();
    Pages.update({_id: this._id}, {$set: page});
    return false;
  }
};

Template.edit.clone = (function(){
  return function (obj) { Object.prototype=obj; return new Object() };
  function Object(){}
}());

Template.edit.page = function () {
  var page_slug = Session.get('page_slug');
  if (!page_slug)
    return {title: 'Sorry, we couldn\'t find the requested page'};
  return Pages.findOne({slug: page_slug});
};