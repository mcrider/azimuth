Template.wysiwyg.rendered = function() {
  $('a[title]').tooltip({container:'body'});
  $('.wysiwyg-editor').wysiwyg();
  $('.dropdown-menu input').click(function() {return false;})
      .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
      .keydown('esc', function () {this.value='';$(this).change();});
}

Template.wysiwyg.events = {
  'keyup .wysiwyg-editor': function(e) {
    $(e.currentTarget).next('.html-editor').val($(e.currentTarget).cleanHtml());
  },
  'keyup .html-editor': function(e) {
    $(e.currentTarget).prev('.wysiwyg-editor').html($(e.currentTarget).val());
  },
  'click .html-editor-button': function(e) {
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