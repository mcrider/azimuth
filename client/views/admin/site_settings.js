Template.site_settings.rendered = function() {
  // Initialize the list of themes
  return Meteor.call('listThemes', function(error, result) {
    Session.set('themeList', result)
  });
}

Template.site_settings.settings = function() {
  return Settings.findOne();
}

Template.site_settings.pages = function () {
  return Pages.find();
};

Template.site_settings.themes = function () {
  return Session.get('themeList')
};

Template.site_settings.isCurrentTheme = function(theme) {
  if (theme == Settings.findOne().theme) return true;
  return false;
}


Template.site_settings.events = {
  'submit #siteSettingsForm': function(e) {
    e.preventDefault();
  	var settings = utils.getFormValues("#siteSettingsForm");
    Settings.update({_id: this._id}, {$set: settings});

    $.pnotify({
      text: 'Site settings saved.',
      type: 'success',
      icon: false,
      addclass: "stack-bottomright",
      stack: utils.pnotify_stack_bottomright
    });
  },
  'click .theme-option': function(e) {
    e.preventDefault();
    Settings.update(Settings.findOne()._id, {$set: {theme: this.path}});

    $(".loading-overlay").show();
    Meteor.call('selectTheme', this.path);
  }
};

Template.site_settings.indexPageEquals = function (slug) {
  return utils.getSetting('indexPage') === slug;
};