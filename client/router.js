/* router.js
 *
 * Uses Backbone's router functionality to route URLs to the correct page.
 *
 */

var PageRouter = Backbone.Router.extend({

  routes: {
    ":page_slug": "showPage",
    ":page_slug/edit": "editPage"
  },

  showPage: function (page_slug) {
    Session.set("page_slug", page_slug);
    var page = Pages.find({slug: page_slug});
    if (!page) return {title: 'Sorry, we couldn\'t find the requested page'};

    var fragment = Meteor.render(function () {
      return Template[ 'page_default' ](); // this calls the template and returns the HTML.
    });
    $("#page").html( fragment );
    return page;
  },

  editPage: function (page_slug) {
    Session.set("page_slug", page_slug);
    // TODO: Deny if user isn't  > author
    var page = Pages.find({slug: page_slug});
    if (!page) return {title: 'Sorry, we couldn\'t find the requested page'};

    var fragment = Meteor.render(function () {
      return Template[ 'edit' ](); // this calls the template and returns the HTML.
    });

    $("#page").html( fragment );
    return page;
  },

  setPage: function (page_slug) {
    this.navigate(page_slug, true);
  }
});

Router = new PageRouter;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});