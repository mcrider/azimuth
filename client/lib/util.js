// Utility methods common to many scripts

utils = {
  getCurrentPage: function() {
    var page_slug = Session.get('page_slug');
    if (!page_slug)
      return {title: 'Sorry, we couldn\'t find the requested page'};
    return Pages.findOne({slug: page_slug});
  }
};