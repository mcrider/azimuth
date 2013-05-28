Template.wysiwyg.rendered = function() {

  $(this.findAll('a[title]')).tooltip({container:'body'});

  // FIXME: Hack: Need to specify events here and associate with a unique wysiwyg container

  var onWysiwygKeyup = function(e) {
    $(e.currentTarget).next('.html-editor').val($(e.currentTarget).cleanHtml());
  }

  var onHtmlKeyup = function(e) {
    $(e.currentTarget).prev('.wysiwyg-editor').html($(e.currentTarget).val());
  }

  onHtmlButtonClick = function(e) {
    $(e.currentTarget).toggleClass('btn-info');
    $(e.currentTarget).closest('.btn-toolbar').next('.wysiwyg-editor').toggleClass('hide');
    $(e.currentTarget).closest('.btn-toolbar').next().next('.html-editor').toggleClass('hide');
  }

  onImageClick = function(e) {
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
  }

  onFileClick = function(e) {
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

  onButtonClick = function(e) {
    $(e.currentTarget).closest('.btn-toolbar').next().next('.html-editor').val($(e.currentTarget).closest('.btn-toolbar').next('.wysiwyg-editor').cleanHtml());
  }
  
  if (this.data.uniqueId) {
    $('#' + this.data.uniqueId + '_wysiwyg').wysiwyg({toolbarSelector: '#' + this.data.uniqueId + '_toolbar'});
    $('#' + this.data.uniqueId + '_wysiwyg').on('keyup', onWysiwygKeyup);
    $('#' + this.data.uniqueId + '_html').on('keyup', onHtmlKeyup);


    $('#' + this.data.uniqueId + '_toolbar .html-editor-button').on('click', onHtmlButtonClick);
    $('#' + this.data.uniqueId + '_toolbar .filepicker-image').on('click', onImageClick);
    $('#' + this.data.uniqueId + '_toolbar .filepicker-file').on('click', onFileClick);

    // Trigger change event when buttons are pressed so HTML is updated
    $('#' + this.data.uniqueId + '_toolbar .btn').on('click', onButtonClick);
  } else {
    $('.wysiwyg-editor').wysiwyg();
  }

  $(this.findAll('.dropdown-menu input')).click(function() {return false;})
      .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
      .keydown('esc', function () {this.value='';$(this).change();});
}
