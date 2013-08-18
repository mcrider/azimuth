Template.new_page.events = {
  'click .submit-new-page': function (e) {
    e.preventDefault();
    var raw_title = $('.title').val();
    var raw_slug = $('.slug').val();

    // Validate input
    if (raw_title == '' || raw_slug == '') {
      $.pnotify({
        text: 'Please enter values for all fields.',
        type: 'error',
        icon: false,
        addclass: "stack-bottomright",
        stack: utils.pnotify_stack_bottomright
      });
      return false;
    }

    Pages.insert({
      title: raw_title,
      slug: raw_slug,
      contents: "<p>This page is empty.</p>",
      template: "page_default"
    });

    // Add to navigation
    var updatePageNav = function(location) {
      var currentPages = Navigation.findOne({location: location}).pages;
      currentPages.push({title: raw_title, slug: raw_slug});
      Navigation.update(Navigation.findOne({location: location})._id, {$set: {pages: currentPages}});
    };

    if (utils.getSetting('addNewPagesToHeader')) {
      updatePageNav('header_active');
    } else {
      updatePageNav('header_disabled');
    }
    if (utils.getSetting('addNewPagesToFooter')) {
      updatePageNav('footer_active');
    } else {
      updatePageNav('footer_disabled');
    }

    Meteor.Router.to('/' + raw_slug + '/edit', {trigger: true});
  },
  'keyup .title': function () {
    var raw_title = $('.title').val();
    raw_title = raw_title.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
    $('.slug').val(raw_title);
  }
};
