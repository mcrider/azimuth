// Utility methods common to many scripts

utils = {
  getCurrentPage: function() {
    var page_slug = Session.get('page_slug');
    if (!page_slug)
      return {notFound: true, title: 'Sorry, we couldn\'t find the requested page'};
    return Pages.findOne({slug: page_slug});
  },
  getFormValues: function(selector) {
    var values = {};
    $.each($(selector).serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });
    return values;
  },
  displayHumanReadableTime: function(timestamp){
    var a = new Date(timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = a.getMonth();
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date+'/'+month+'/'+year.toString().slice(2)+' @ '+hour+':'+min+':'+sec ;
    return time;
  },
  loadTemplate: function(template) {
    return Meteor.render(function () {
      return Template[ template ](); // this calls the template and returns the HTML.
    });
  }
};