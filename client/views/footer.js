Template.footer.rendered = function() {
  Meteor.defer(function() {
    $(".loading-overlay").fadeOut('slow', function() {
     $("#contents").hide().removeClass('hidden').fadeIn('slow'); 
    });   
  });
}

Template.footer.footerNav = function () {
  var nav = Navigation.findOne({location: "footer_active"});
  if (nav) return nav.pages;
  return false;
};
