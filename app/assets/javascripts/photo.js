"use strict;"

var PHOTO = {};

PHOTO.PhotoModule = (function(){

  var _names = ['Waldo', 'Wenda', 'Odlaw', 'Wizard Whitebeard', 'Woof'];

  function init(){
    _setHoverListener();
  }

  function _setHoverListener(){
    // TODO: It looks like hover out doesn't work if you move the mouse slowly???
    $('#image-container').hover(_hoverIn, _hoverOut);
  }

  function _hoverIn(){
    $('.tagged').show();
    _addTaggerBox();
  }

  function _hoverOut(){
    $('.tagged').hide();
    _removeTaggerBox();
  }

  function _addTaggerBox(){
    // Create the tag div
    var $taggerBox = $('<div class="box"></div>')
      .addClass('tagger');

    // Add the tag div to the DOM
    $('#image-container').prepend($taggerBox);

    // Set listeners
    $('#image-container').mousemove(_setTagPosition);
    $('.tagger').click(_setTag);
  }

  function _removeTaggerBox(){
    $('.tagger').remove();
  }

  function _removeTaggingBox(){
    $('.tagging').remove();
  }

  function _setTagPosition(event){
    $('.tagger')
      .offset({
        top: event.pageY - 35,
        left: event.pageX - 35
      });
  }

  function _setTag(event){
    // Remove mouse and click listeners
    $('#image-container').off("mousemove");
    $('.tagger').off("click");

    var $dropdown = _getNameDropdown();

    var $tagger = $('.tagger')

    $tagger
      .addClass('tagging')
      .removeClass('tagger')
      .append($dropdown);

    var top = $tagger.offset().top + 74;
    var left = $tagger.offset().left;

    $dropdown
      .offset({
        top: top,
        left: left
      })
      .slideDown(350);

    $('.name-dropdown').on('click', 'li', _saveTag);
    $('#photo').click(_cancelTagging);
  }

  function _saveTag(event){
    var name = $(event.target).text();
    var offset = $('.tagging').offset();
    var data = {
      tag: {
        character: name,
        top: offset.top,
        left: offset.left
      }
    };

    // Submit new tag
    $.ajax({
      url: 'tags',
      method: 'POST',
      data: data,
      dataType: 'json',
      success: function(json){
        console.log('Added new tag!');
        _renderNewTag(json);
      }
    });

    $('.name-dropdown').slideUp(350);
  }

  function _renderNewTag(json){
    console.log(json);
    var $name = $('<div></div>')
      .attr('class', 'name')
      .text(json.character);

    $('.tagging')
      .addClass('tagged')
      .removeClass('tagging')
      .html($name);
  }

  function _cancelTagging(){
    $('.name-dropdown').slideUp(350);

    $('.tagging')
      .addClass('tagger')
      .removeClass('tagging');

    // Reset listeners
    $('#image-container').mousemove(_setTagPosition);
    $('.tagger').click(_setTag);
  }

  function _getNameDropdown(){
    $list = $('<ul></ul>');

    _names.forEach(function(name){
      var $name = $('<li></li>').text(name);
      $list.append($name);
    })

    $outerDiv = $('<div></div>')
      .attr('class', 'name-dropdown')
      .html($list);

    return $outerDiv;
  }

  return {
    init: init
  }
})();
