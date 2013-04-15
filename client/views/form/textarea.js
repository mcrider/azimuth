

Template.textarea.events = {
  'click .filepicker-image': function(e) {
    filepicker.setKey(Settings.findOne().filepickerKey);
    var $textarea = $(e.currentTarget).siblings('textarea');
    filepicker.pick({
        mimetypes: ['image/*']
      }, 
      function(FPFile){
        $textarea.val($textarea.val()+"<img src='"+FPFile.url+"' />"); 
        console.log(FPFile.url);
      }
    );
  },
  'click .filepicker-file': function(e) {
    filepicker.setKey(Settings.findOne().filepickerKey);
    var $textarea = $(e.currentTarget).siblings('textarea');
    filepicker.pick(
      function(FPFile){
        $textarea.val($textarea.val()+"<a href='"+FPFile.url+"'>"+FPFile.filename+"</a>"); 
        console.log(FPFile.url);
      }
    );
  }
}