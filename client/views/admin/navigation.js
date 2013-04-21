// Site navigation
Template.navigation.rendered = function() {
  var updateNav = function(location) {
    return function() {
      var active = Navigation.findOne({location: location + '_active'});
      var disabled = Navigation.findOne({location: location + '_disabled'});
      Navigation.update({_id: active._id}, {$set: {pages: $('#'+location + '_active').nestable('serialize')}});
      Navigation.update({_id: disabled._id}, {$set: {pages: $('#'+location + '_disabled').nestable('serialize')}});
    }
  }

  $("#header_active, #header_disabled").nestable({maxDepth: 4, group: 1}).on('change', updateNav('header'));
  $("#footer_active, #footer_disabled").nestable({maxDepth: 1, group: 2}).on('change', updateNav('footer'));
}

Template.navigation.headerNav = function() {
  var nav = Navigation.findOne({location: "header_active"});
  if (nav) return nav.pages;
  return false;
}

Template.navigation.headerNavDisabled = function() {
  var nav = Navigation.findOne({location: "header_disabled"});
  if (nav) return nav.pages;
  return false;
}

Template.navigation.footerNav = function() {
  var nav = Navigation.findOne({location: "footer_active"});
  if (nav) return nav.pages;
  return false;
}

Template.navigation.footerNavDisabled = function() {
  var nav = Navigation.findOne({location: "footer_disabled"});
  if (nav) return nav.pages;
  return false;
}