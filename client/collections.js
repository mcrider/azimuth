/* init.js
 *
 * Startup code for the front-end.
 *
 */

Pages = new Meteor.Collection("pages");
Blocks = new Meteor.Collection("blocks");
PageBlocks = new Meteor.Collection("pageBlocks");
User_list = new Meteor.Collection("user_list");
Settings = new Meteor.Collection("settings");
Navigation = new Meteor.Collection("navigation");


// ID of currently selected page
Session.set('page-slug', null);

pagesSubscription = Meteor.subscribe('pages');
blocksSubscription = Meteor.subscribe('blocks');
pageBlocksSubscription = Meteor.subscribe('pageBlocks');
user_listSubscription = Meteor.subscribe('user_list');
rolesSubscription = Meteor.subscribe('roles');
settingsSubscription = Meteor.subscribe('settings');
navigationSubscription = Meteor.subscribe('navigation');
