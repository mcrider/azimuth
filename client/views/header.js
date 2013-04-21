// Accompanying JS file for the header template.
// Describes the page's metadata and actions.

Template.header.headerNav = function () {
  var nav = Navigation.findOne({location: "header_active"});
  if (nav) return nav.pages;
  return false;
};

Template.header.helpers({
  displayName: function(){
    var user = Meteor.user();
    return (user.profile && user.profile.name) || user.username || (user.emails && user.emails[0] && user.emails[0].address);
  },
  loading : function() {
    return Session.get('loading');
  }
});

Template.header.events = {
  'click #newPage': function () {
    $('#addNewPageModal').modal('show');
  },
  'click .submit-new-page': function () {
    var raw_title = $('.page-title-textfield').val();
    var raw_slug = $('.page-slug-textfield').val();

    $('#addNewPageModal').modal('hide');

    // Validate input
    if (raw_title == '' || raw_slug == '') {
      $.pnotify({
        text: 'Please enter values for all fields.',
        type: 'error',
        icon: false
      });
      return false;
    }

    Pages.insert({
      title: raw_title,
      slug: raw_slug,
      contents: "<p>This page is empty.</p>",
      template: "page_default"
    });

    Meteor.Router.to('/' + raw_slug + '/edit', {trigger: true});
  },
  'keyup .page-title-textfield': function () {
    var raw_title = $('.page-title-textfield').val();
    raw_title = _.slugify(raw_title);
    $('.page-slug-textfield').val(raw_title);
  }
};