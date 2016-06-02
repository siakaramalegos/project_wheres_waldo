"use strict;"

var PHOTO = PHOTO || {};

PHOTO.PhotoModule = (function(){

  // TODO: This is defined in 2 places. Fix.
  var _names = ['Waldo', 'Wenda', 'Odlaw', 'Wizard Whitebeard', 'Woof'];

  function init(){
    // Gets and renders any existing tags
    PHOTO.TagModule.init();

    // Set up listeners
    _setHoverListener();
    _setResizeListener();
  }

  // Re-position existing tags when window is resized
  function _setResizeListener(){
    $(window).resize(function(){
      PHOTO.TagModule.renderTags();
    })
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
    var position = $('.tagging').position();
    var relativeTop = (position.top + 35) / $('#image-container').height();
    var relativeLeft = (position.left + 35) / $('#image-container').width();

    var data = {
      tag: {
        character: name,
        top: relativeTop,
        left: relativeLeft
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
        PHOTO.TagModule.addTag(json);
        _cancelTagging();
      }
    });
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
