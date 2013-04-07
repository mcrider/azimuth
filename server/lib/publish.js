Meteor.publish('pages', function () {
  return Pages.find();
});

Meteor.publish('blocks', function () {
  return Blocks.find();
});


Meteor.publish('user_list', function () {
  // FIXME: publish only if admin
  return Meteor.users.find();
});

Meteor.publish('roles', function () {
  // FIXME: publish only if admin
  return Meteor.roles.find();
});

