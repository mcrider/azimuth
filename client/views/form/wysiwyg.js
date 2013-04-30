Template.wysiwyg.rendered = function() {
  debugger;
  $(this.findAll('a[title]')).tooltip({container:'body'});
  
  // Hack to get multiple instances of editor to work
  if (this.data.uniqueId) {
    $('#' + this.data.uniqueId + '_wysiwyg').wysiwyg({toolbarSelector: '#' + this.data.uniqueId + '_toolbar'});
  } else {
    $('.wysiwyg-editor').wysiwyg();
  }

  
  $(this.findAll('.dropdown-menu input')).click(function() {return false;})
      .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
      .keydown('esc', function () {this.value='';$(this).change();});
}

Template.wysiwyg.events = {
  'keyup .wysiwyg-editor': function(e) {
    debugger;
    $(e.currentTarget).next('.html-editor').val($(e.currentTarget).cleanHtml());
  },
  'keyup .html-editor': function(e) {
    debugger;
    $(e.currentTarget).prev('.wysiwyg-editor').html($(e.currentTarget).val());
  },
  'click .html-editor-button': function(e) {
    debugger;
    $(e.currentTarget).toggleClass('btn-info');
    $(e.currentTarget).closest('.btn-toolbar').next('.wysiwyg-editor').toggleClass('hide');
    $(e.currentTarget).closest('.btn-toolbar').next().next('.html-editor').toggleClass('hide');
  },
  'click .filepicker-image': function(e) {
    filepicker.setKey(Settings.findOne().filepickerKey);
    var $inputArea = $(e.currentTarget).closest('.btn-toolbar').next('.wysiwyg-editor');
    filepicker.pick({
        mimetypes: ['image/*']
      }, 
      function(FPFile){
        $inputArea.focus();
        document.execCommand('insertimage', 0, FPFile.url);
        console.log(FPFile.url);
      }
    );
  },
  'click .filepicker-file': function(e) {
    filepicker.setKey(Settings.findOne().filepickerKey);
    var $inputArea = $(e.currentTarget).closest('.btn-toolbar').next('.wysiwyg-editor');
    filepicker.pick(
      function(FPFile){
        $inputArea.focus();
        document.execCommand('createLink', 0, FPFile.url);
        console.log(FPFile.url);
      }
    );
  }
}