Template.site_settings.settings = function() {
  return Settings.findOne();
}

Template.site_settings.pages = function () {
  return Pages.find();
};

Template.site_settings.events = {
  'submit #siteSettingsForm': function(e) {
    e.preventDefault();
  	var settings = utils.getFormValues("#siteSettingsForm");
    Settings.update({_id: this._id}, {$set: settings});
    $.pnotify({
      text: 'Site settings saved.',
      type: 'success',
      icon: false
    });
  }
};

Template.site_settings.indexPageEquals = function (slug) {
  return utils.getSetting('indexPage') === slug;
};