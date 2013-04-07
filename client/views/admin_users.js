Template.admin_users.users = function() {
  return Meteor.users.find();
};

Template.admin_users.events = {
  'click .admin': function() {
    if(!this._id) return false;
    debugger;
    Roles.addUsersToRoles(this._id, ['admin']);
  },
  'click .author': function() {
    if(!this._id) return false;
    Roles.addUsersToRoles(this._id, ['author']);
  }
};