Template.page_template_selector.templates = function() {
  return registry.pageTemplates;
}

Template.page_template_selector.events = {
  'change .page-template-selector': function() {
    var pageData = utils.getFormValues("#pageEditForm");
    Pages.update({_id: this._id}, {$set: pageData});
    var fragment = Meteor.render(function () {
      template = page.template ? page.template : 'page_default';
      return Template[ template + "_edit" ](); // this calls the template and returns the HTML.
    });
    Spark.finalize($("#page")[0]);
    $("#page").html(fragment);
  }
}