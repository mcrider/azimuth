// Accompanying JS file for the header template.
// Describes the page's metadata and actions.

Template.header.rendered = function() {
  // Set page title
  document.title = utils.getSetting('siteName');

  // Hack to make login menu an icon rather than username
  $('#login-buttons .dropdown').removeClass('dropdown');
  var username = $('#login-dropdown-list .dropdown-toggle').text();
  $('#login-dropdown-list .dropdown-menu').prepend('<div class="nav-header">'+username+'</div>');
  $('#login-dropdown-list .dropdown-toggle').html('<i class="icon-user'+ (Meteor.user() ? ' logged-in':'')+'"></i> <b class="caret"></b>');
}

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

    // Add to navigation
    var updatePageNav = function(location) {
      var currentPages = Navigation.findOne({location: location}).pages;
      currentPages.push({title: raw_title, slug: raw_slug});
      Navigation.update(Navigation.findOne({location: location})._id, {$set: {pages: currentPages}});
    };

    if (utils.getSetting('addNewPagesToHeader')) {
      updatePageNav('header_active');
    } else {
      updatePageNav('header_disabled');
    }
    if (utils.getSetting('addNewPagesToFooter')) {
      updatePageNav('footer_active');
    } else {
      updatePageNav('footer_disabled');
    }

    Meteor.Router.to('/' + raw_slug + '/edit', {trigger: true});
  },
  'keyup .page-title-textfield': function () {
    var raw_title = $('.page-title-textfield').val();
    raw_title = _.slugify(raw_title);
    $('.page-slug-textfield').val(raw_title);
  }
};

Template.header.headerNav = function () {
  var nav = Navigation.findOne({location: "header_active"});
  if (nav) return nav.pages;
  return false;
};

Template.header.pages = function () {
  return Pages.find();
};