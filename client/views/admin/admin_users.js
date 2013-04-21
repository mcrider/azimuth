Template.admin_users.users = function() {
  return Meteor.users.find();
};

Template.admin_users.events = {
  'click .admin': function() {
    if(!this._id) return false;
    if(_.contains(this.roles, "admin")) Roles.removeUsersFromRoles([this._id], ['admin']);
    else Roles.addUsersToRoles([this._id], ['admin']);
  },
  'click .author': function() {
    if(!this._id) return false;
    if(_.contains(this.roles, "author")) Roles.removeUsersFromRoles([this._id], ['author']);
    else Roles.addUsersToRoles([this._id], ['author']);
  }
};