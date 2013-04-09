/* init.js
 *
 * Startup code for the front-end.
 *
 */

Pages = new Meteor.Collection("pages");
Blocks = new Meteor.Collection("blocks");
User_list = new Meteor.Collection("user_list");
Settings = new Meteor.Collection("settings");


// ID of currently selected page
Session.set('page_slug', null);

Meteor.subscribe('pages');
Meteor.subscribe('blocks');
Meteor.subscribe('user_list');
Meteor.subscribe('roles');
Meteor.subscribe('settings');
