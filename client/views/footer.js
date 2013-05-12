Template.footer.rendered = function() {
  $(".navbar, .footer").removeClass('hidden');
  $("#page").show();
  $(".loading-overlay").fadeOut('slow');
}

Template.footer.footerNav = function () {
  var nav = Navigation.findOne({location: "footer_active"});
  if (nav) return nav.pages;
  return false;
};
