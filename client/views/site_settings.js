Template.site_settings.settings = function() {
  return Settings.findOne();
}

Template.site_settings.events = {
  'submit #siteSettingsForm': function() {
  	var settings = utils.getFormValues("#siteSettingsForm");
    Settings.update({_id: this._id}, {$set: settings});
    $.pnotify({
      text: 'Site settings saved.',
      type: 'success',
      icon: false
    });

    return false;
  }
};