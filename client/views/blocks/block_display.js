
Template.block_display.currentBlockPage = function(zone) {
  return Session.equals("zone_"+zone+"_skip", this.valueOf() - 1) ? "active" : "";
}

Template.block_display.events = {
  'click .page': function (e) {
    e.preventDefault();
    var page = this.valueOf();
    var zone = $(e.currentTarget).closest('.pagination').data('zone');
    Session.set("zone_"+zone+"_skip", page - 1)
  }
}