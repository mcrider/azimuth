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
    $("#page").html( utils.loadTemplate('site_settings') );
    return page;
  },
  "/navigation": function() {
    if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
      return false;
    }
    $("#page").html( utils.loadTemplate('navigation') );
    return page;
  },
  "/users": function() {
    if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
      return false;
    }
		$("#page").html( utils.loadTemplate('admin_users') );
		return page;
	},
  "/": function() {
    if (! pagesSubscription.ready()) {
      return 'loading';
    }
    var slug = utils.getSetting('indexPage');
    var page = Pages.findOne({slug: slug});
    if(!page) {
      page = Pages.findOne();
      if (!page) return {title: 'Sorry, this site has no pages!'};
      else slug = page.slug;
    }
    Session.set("page-slug", slug);

    var fragment = Meteor.render(function () {
      template = page.template ? page.template : 'page_default';
      return Template[ template ](); // this calls the template and returns the HTML.
    });

    $("#page").html(fragment);
    return page;
  },
  "*/edit": function (page_slug) {
    if (!Roles.userIsInRole(Meteor.user(), ['author','admin'])) {
      return false;
    }

    if (page_slug.charAt(0) == '/') page_slug = page_slug.substr(1);
    Session.set("page-slug", page_slug);

    var page = Pages.findOne({slug: page_slug});
    if (!page) return {title: 'Sorry, we couldn\'t find the requested page'};

    var fragment = Meteor.render(function () {
      template = page.template ? page.template : 'page_default';
      return Template[ template + "_edit" ](); // this calls the template and returns the HTML.
    });

    $("#page").html(fragment);
    return page;
  },
  "*": function (page_slug) {
    if (page_slug.charAt(0) == '/') page_slug = page_slug.substr(1);
    Session.set("page-slug", page_slug);
    var page = Pages.findOne({slug: page_slug});
    if (!page) return {title: 'Sorry, we couldn\'t find the requested page'};

    var fragment = Meteor.render(function () {
      template = page.template ? page.template : 'page_default';
      return Template[ template ](); // this calls the template and returns the HTML.
    });
    $("#page").html( fragment );
    return page;
  }
});

/*  setPage: function (page_slug) {
    this.navigate(page_slug, true);
  }*/
