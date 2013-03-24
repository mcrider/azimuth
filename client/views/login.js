// Validators, helpers
//

(function(){

// Trim Input
function trimInput(val) {
  return val.replace(/^\s*|\s*$/g, "");
};

// Validations
function isEmail(val, field) {
  if (val.indexOf('@') !== -1) {
      return true;
    } else {
      Session.set('displayMessage', 'Error & Please enter a valid email address.')
      return false;
    }
};

function isValidPassword(val, field) {
  if (val.length >= 6) {
    return true;
  } else {
    Session.set('displayMessage', 'Error & Your password should be 6 characters or longer.')
    return false;
  }
}

function isNotEmpty(val, field) {
  // if null or empty, return false
  if (!val || val === ''){
    Session.set('displayMessage', 'Error & Please fill in all required fields.')
    return false;
  }
  return true;
};

// Login Form Helpers
Template.loginForm.helpers({

  loginForm: function(){
    if (!Session.get('formView'))
      return true
  },

  createAccount: function(){
    return Session.equals('formView', 'createAccountForm');
  },

  passwordRecovery: function(){
    return Session.equals('formView', 'passwordRecoveryForm');
  }

});

// On successful login, hide the overlay button. And
// if we are in the create project flow, then create
// the project and move to the project view.
function onLogin(err){
  if (err) {
    Session.set('displayMessage', 'Login Error &' + err.reason);
    return;
  }
};


// Login Form Events
Template.loginForm.events({

  'submit #login-form' : function(e, t) {
    e.preventDefault();
    var email = trimInput(t.find('#login-email').value.toLowerCase())
      , password = t.find('#login-password').value;

    if (isNotEmpty(email, 'loginError')
        && isNotEmpty(password, 'loginError'))
    {
      Meteor.loginWithPassword(email, password, function(err){
        onLogin(err);
      });
    };

    return false
  },

  'click #forgot-password' : function(e, t) {
    Session.set('formView', 'passwordRecoveryForm');
  },

  'click #create-account' : function(e, t) {
    Session.set('formView', 'createAccountForm');
  },

  'click a.google' : function(e, t){
    Meteor.loginWithGoogle(function(err){
      onLogin(err);
    });
  },

  'click a.facebook' : function(e, t){
    Meteor.loginWithFacebook(function(err){
     onLogin(err);
    });
  },

  'click a.twitter' : function(e, t){
    Meteor.loginWithTwitter(function(err){
      onLogin(err);
    });
  }

});

// Reset our Session variables when the template
// is destroyed.
Template.loginForm.destroyed = function(){
  Session.set('formView', null);
};

// Create an account and login the user.
Template.createAccountForm.events({

  'submit #register-form' : function(e, t) {
    var email = trimInput(t.find('#account-email').value.toLowerCase())
      , password = t.find('#account-password').value;

    if (isNotEmpty(email, 'accountError')
        && isNotEmpty(password, 'accountError')
        && isEmail(email, 'accountError')
        && isValidPassword(password, 'accountError'))
    {
      Session.set('loading', true)
      Accounts.createUser({email: email, password : password}, function(err){
        if (err && err.error === 403) {
          Session.set('displayMessage', 'Account Creation Error &' + err.reason)
          Session.set('loading', false);
        } else {
          if (Session.get('createProjectFlow')) createProject();
          Session.set('overlay', null);
        }
        Session.set('loading', false);
      });
    }
    return false
  }

});

Template.passwordRecoveryForm.helpers({

  resetToken: function(){
    return Session.get('resetPassword');
  }

});

Template.passwordRecoveryForm.events({

  'submit #recovery-form' : function(e, t) {
      var email = trimInput(t.find('#recovery-email').value)
      if (isNotEmpty(email, 'recoveryError') && isEmail(email, 'recoveryError')) {
        Session.set('loading', true);
        Accounts.forgotPassword({email: email}, function(err){
        if (err)
          Session.set('displayMessage', 'Password Reset Error & ' + err.reason)
        else {
          Session.set('displayMessage', 'Email Sent & Please check your email to reset your password.')
          Session.set('passwordView', null)
          Router.navigate('');
        }
        Session.set('loading', false);
      });
      }
      return false;
    },

    'submit #new-password' : function(e, t) {
      var pw = t.find('#new-password-password').value;
      if (isNotEmpty(pw) && isValidPassword(pw)) {
        Session.set('loading', true);
        Accounts.resetPassword(Session.get('resetPassword'), pw, function(err){
          if (err)
            Session.set('displayMessage', 'Password Reset Error & '+ err.reason);
          else {
            Session.set('currentView', 'library');
            Session.set('resetPassword', null);
            Router.navigate('library');
          }
          Session.set('loading', false);
        });
      }
    return false;
    }

});


})();