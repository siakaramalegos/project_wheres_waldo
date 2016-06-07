"use strict;"

var APP = APP || {};

APP.TagModule = (function(){
  var tags;

  function init(){
    _getTags();
  }

  function deleteTag(event){
    var $target,
        tagID;

    if ( $(event.target).hasClass('tagged') ){
      $target = $(event.target);
    } else {
      $target = $(event.target).parent('.tagged');
    }
    tagID = $target.data('id');

    $.ajax({
      url: 'tags/' + tagID + '.json',
      method: 'DELETE',
      success: function(json){
        $target.remove();
      }
    });
  }

  function addTag(tag){
    tags.push(tag);
    _renderTag(tag);
  }

  function _getTags(){
    $.ajax({
      url: 'tags.json',
      method: 'GET',
      success: function(json){
        tags = json;
        renderTags();
      }
    });
  }

  function renderTags(){
    $('.tagged').remove();

    tags.forEach(function(tag){
      _renderTag(tag);
    });
  }

  function _renderTag(tag){
    var width = $('#image-container').width();
    var height = $('#image-container').height();

    var $name = $('<div></div>')
      .attr('class', 'name')
      .text(tag.character);

    var $tagBox = $('<div class="box"></div>')
      .addClass('tagged')
      .attr('data-id', tag.id)
      .html($name)
      .css( {
        top: tag.top * height - 35,
        left: tag.left * width - 35
      })
      .show();

    $('#image-container').prepend($tagBox);
  }

  return {
    init: init,
    renderTags: renderTags,
    addTag: addTag,
    deleteTag: deleteTag,
    tags: tags
  }
})();