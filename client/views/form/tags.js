Template.tags.rendered = function() {
  $('.tag').remove();
  $('#tags').val('');
  $("#tags_tag").focus()
  $('#tags').tagsInput({
    height: '43px',
    defaultText: '',
    onAddTag: function() {
      var tag = _.last($('#tags').val().split(','))
      $('#tags').importTags(tag);
    }
  });
}

