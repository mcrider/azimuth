/* router.js
 *
 * Uses Meteor-router to route URLs to the correct page.
 *
 */

Meteor.Router.add({
  "/settings": function() {
    if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
      throw new Meteor.Error(403, "Not authorized");
      return false;
    }
    $("#page").html( utils.loadTemplate('site_settings') );
    return page;
  },
  "/users": function() {
    if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
      throw new Meteor.Error(403, "Not authorized");
      return false;
    }
		$("#page").html( utils.loadTemplate('admin_users') );
		return page;
	},
  "/": function() {
    debugger;
    var page = Pages.findOne();
    if (!page) return {title: 'Sorry, this site has no pages!'};
    Session.set("page_slug", page.slug);

    var fragment = Meteor.render(function () {
      template = page.template ? page.template : 'page_default';
      return Template[ template ](); // this calls the template and returns the HTML.
    });

    $("#page").html(fragment);
    return page;
  },
  "*/edit": function (page_slug) {
    if (!Roles.userIsInRole(Meteor.user(), ['author','admin'])) {
      throw new Meteor.Error(403, "Not authorized");
      return false;
    }

    if (page_slug.charAt(0) == '/') page_slug = page_slug.substr(1);
    Session.set("page_slug", page_slug);

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
    Session.set("page_slug", page_slug);
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
