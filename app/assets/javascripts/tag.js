"use strict;"

var PHOTO = PHOTO || {};

PHOTO.TagModule = (function(){
  var tags;

  function init(){
    _getTags();
  }

  function addTag(tag){
    tags.push(tag);
    _renderTag(tag);
  }

  function _getTags(){
    console.log("Fetching tags...")
    var response;

    $.ajax({
      url: 'tags.json',
      method: 'GET',
      success: function(json){
        console.log('Success!');
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
      .attr('data-top', tag.top)
      .attr('data-left', tag.left)
      .html($name)
      .offset( {
        top: tag.top * height - 35,
        left: tag.left * width - 35
      });

    $('#image-container').prepend($tagBox);
  }

  return {
    init: init,
    renderTags: renderTags,
    addTag: addTag,
    tags: tags
  }
})();