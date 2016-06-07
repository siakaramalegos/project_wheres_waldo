"use strict;"

var PHOTO = PHOTO || {};

PHOTO.PhotoModule = (function(){

  function init(){
    // Gets and renders any existing tags
    PHOTO.TagModule.init();

    // Set up listeners
    // TODO: hover out slow not working?
    $('#image-container').hover(_hoverIn, _hoverOut);
    $('#image-container').mousemove(_setTagPosition);
    $('#image-container').on('click', '.tagger', _setTag);
    $('#image-container').on('click', '.tagged', PHOTO.TagModule.deleteTag);
    $('.name-dropdown').on('click', 'li', _saveTag);
    $(document).click(_clickOutsideTags);

    // Re-position existing tags when window is resized
    $(window).resize(function(){
      PHOTO.TagModule.renderTags();
    })
  }

  function _hoverIn(){
    $('.tagged').show();
    $('.tagger').show();
  }

  function _hoverOut(){
    $('.tagged').hide();
    $('.tagger').hide();
  }

  function _setTagPosition(event){
    $('.tagger')
      .offset({
        top: event.pageY - 35,
        left: event.pageX - 35
      });
  }

  function _setTag(event){
    var top = $('.tagger').position().top;
    var left = $('.tagger').position().left;

    $('.tagger').hide();
    $('.tagging')
      .css({
        top: top,
        left: left
      })
      .show();

    $('.name-dropdown')
      .css({
        top: top + 74,
        left: left
      })
      .slideDown(350);
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
        PHOTO.TagModule.addTag(json);
        _cancelTagging();
      }
    });
  }

  function _clickOutsideTags(){
    if( !$(event.target).closest('.box').length &&
      !$(event.target).is('.box') ){
        _cancelTagging();
    }
  }

  function _cancelTagging(){
    $('.name-dropdown').slideUp(350);
    $('.tagging').fadeOut(350);
    $('.tagger').show();
  }

  return {
    init: init
  }
})();
