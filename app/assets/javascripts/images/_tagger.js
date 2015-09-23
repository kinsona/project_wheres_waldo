var WALDO = WALDO || {};


WALDO.Tagger = (function(){
  var $_image;
  var $_tagger;
  var tagger;
  var _characters;

  function init(available_characters) {
    $_image = $('.game-image');
    _characters = available_characters;
    enable();
  };


  function enable() {
    $_image.on('click', _buildTagger );
    $('.image-wrapper').on('click', '.dropdown li', _saveTag );
    $('.image-wrapper').on('mouseenter', _showTags );
    $('.image-wrapper').on('mouseleave', _hideTags );
  };


  function _showTags() {
    $('.tag').show();
  };


  function _hideTags() {
    $('.tag').hide();
  };


  function disable() {
    $_image.off('click');
    $('.dropdown').off('click');
  };


  function _buildTagger() {
    tagger = new Tag(event.pageX, event.pageY);
    tagger.$html.insertAfter($_image).css('left', tagger.x - 24).css('top', tagger.y - 24);
    $_tagger = $('.tagger');
    tagger.showDropdown();
  };


  function Tag(x, y) {
    this.$html = $("<div class='tagger'></div>");
    this.x = x;
    this.y = y;
  };




  Tag.prototype.showDropdown = function() {
    var $characterList = $("<ul class='dropdown'></ul>");
    _characters.forEach( function(name) {
      var $listItem = $("<li>" + name + "</li>");
      $characterList.append($listItem);
    });

    $characterList.insertAfter($_tagger).hide().slideDown();
    // should modify so that it pops out to the left side of you're near the right edge
    $('.dropdown').css('left', tagger.x);
    $('.dropdown').css('top', tagger.y - 24);
  };



  function _saveTag() {
    tagger['character'] = event.target.innerHTML;

    WALDO.ShowModule.saveTag(tagger);

    _characters.splice(_characters.indexOf(tagger.character),1)
    $('.dropdown').slideUp(150, this.remove);
    $_tagger.remove();
    _renderSavedTag(tagger);
    //tagger = null;
  }


  function renderAllSavedTags(tags) {
    tags.forEach( _renderSingleTag );
  }


  function _renderSavedTag(tag) {
    $("<div class='tag'>" + tag.character + "</div>").appendTo($('.image-wrapper')).css('left', tag.x - 24).css('top', tag.y - 24);
  };


  return {
    init: init,
    enable: enable,
    disable: disable
  }

})();