var WALDO = WALDO || {};


WALDO.Tagger = (function(){
  var $_image;
  var $_tagger;
  var tagger;
  var CHARACTERS;

  function init() {
    $_image = $('.game-image');
    CHARACTERS = ['Waldo', 'Wenda', 'Odlaw', 'Wizard Whitebeard', 'Woof'];
    enable();
  };


  function enable() {
    $_image.on('click', _buildTagger );
  };


  function disable() {
    $_image.off('click');
  };


  function _buildTagger() {
    tagger = new TagConstructor(event.pageX, event.pageY);
    tagger.$html.insertAfter($_image).css('left', tagger.x - 24).css('top', tagger.y - 24);
    $_tagger = $('.tagger');
    tagger.showDropdown();
  };


  function TagConstructor(x, y) {
    this.$html = $("<div class='tagger'></div>");
    this.x = x;
    this.y = y;
  };


  TagConstructor.prototype.showDropdown = function() {
    var $characters = $("<ul class='dropdown'></ul>");
    CHARACTERS.forEach( function(name, index) {
      var $listItem = $("<li>" + name + "</li>");
      $characters.append($listItem);
    });

    $characters.insertAfter($_tagger);
    $('.dropdown').css('left', tagger.x);
    $('.dropdown').css('top', tagger.y - 24);
  };


  TagConstructor.prototype.save = function() {

  };



  return {
    init: init,
    enable: enable,
    disable: disable
  }

})();