// Accompanying JS file for the header template.
// Describes the page's metadata and actions.

Template.footer.footerNav = function () {
  var nav = Navigation.findOne({location: "footer_active"});
  if (nav) return nav.pages;
  return false;
};
