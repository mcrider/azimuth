Template.loginButtonsFullPage.displayName = function () {
  return Accounts._loginButtons.displayName();
};

// shared between dropdown and single mode
Template.loginButtonsFullPage.events({
  'click #login-buttons-logout': function() {
    Meteor.logout(function () {
      loginButtonsSession.closeDropdown();
    });
  }
});