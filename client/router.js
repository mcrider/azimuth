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
  },
  editPage: function (page_slug) {
    // TODO: Deny if user isn't  > author
  },
  setPage: function (page_slug) {
    this.navigate(page_slug, true);
  }
});

Router = new PageRouter;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});