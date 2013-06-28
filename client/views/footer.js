Template.footer.footerNav = function () {
  var nav = Navigation.findOne({location: "footer_active"});
  if (nav) return nav.pages;
  return false;
};
