/* router.js
 *
 * Uses Meteor-router to route URLs to the correct page.
 *
 */

Meteor.Router.add({
  "/settings": function() {
    if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
      return false;
    }
    return 'site_settings';
  },
  "/new_page": function() {
    if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
      return false;
    }
    return 'new_page';
  },
  "/navigation": function() {
    if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
      return false;
    }
    return 'navigation';
  },
  "/login": function() {
    return 'loginButtonsFullPage';
  },

  "/users": function() {
    if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
      return false;
    }
    return 'admin_users';
	},
  "/": function() {
    // Don't render until we have our data
    if (!pagesSubscription.ready() || !settingsSubscription.ready()) {
      return '';
    } else {
      var page_slug = utils.getSetting('indexPage');
      var page = Pages.findOne({slug: page_slug});
      if(!page) {
        page = Pages.findOne();
        if (!page) return '404';
        else page_slug = page.slug;
      }

      Session.set("page-slug", page_slug);
      return page.template;
    }
  },
  "*/edit": function (page_slug) {
    if (!Roles.userIsInRole(Meteor.user(), ['author','admin'])) {
      return false;
    }

    // Don't render until we have our data
    if (!pagesSubscription.ready() || !settingsSubscription.ready()) {
      return '';
    } else {
      if (page_slug.charAt(0) == '/') page_slug = page_slug.substr(1);

      var page = Pages.findOne({slug: page_slug});
      if(!page) return '404';

      Session.set("page-slug", page_slug);
      return page.template + '_edit';
    }
  },
  "*": function (page_slug) {
    // Don't render until we have our data
    if (!pagesSubscription.ready() || !settingsSubscription.ready()) {
      return '';
    } else {
      if (page_slug.charAt(0) == '/') page_slug = page_slug.substr(1);

      var page = Pages.findOne({slug: page_slug});
      if(!page) return '404';

      Session.set("page-slug", page_slug);
      return page.template;
    }
  }
});
