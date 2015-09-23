var WALDO = WALDO || {};


WALDO.Tagger = (function(){

  var $_playarea;
  var tagger;
  var _characters;


  function init(available_characters) {
    $_playarea = $('.game-wrapper');
    _characters = available_characters;
    enable();
  };


  function enable() {
    $_playarea.on('click', '.game-image', _buildTagger );
    $_playarea.on('click', '.dropdown li', _saveTag );
    $_playarea.on('mouseenter', function() { $('.tag').show() } );
    $_playarea.on('mouseleave', function() { $('.tag').hide() } );
  };


  function disable() {
    $_playarea.off('click');
  };


  function _buildTagger() {
    // cancel active tagger if it exists
    $('.tagger').remove();

    tagger = new Tag(event.pageX, event.pageY);
    console.log(event)
    tagger.render()
    tagger.showDropdown();
  };


  function Tag(x, y) {
    this.x = x;
    this.y = y;
  };


  Tag.prototype.render = function() {
    $("<div class='tagger'></div>").appendTo($_playarea).css('left', this.x - 24).css('top', this.y - 24);
  };


  Tag.prototype.showDropdown = function() {
    $characterList = _buildCharacterList();

    var $tagger = $('.tagger');
    $characterList.appendTo($tagger).hide().slideDown();

    this.setDropdownCoordinates();
  };


  Tag.prototype.setDropdownCoordinates = function() {
    if ( this.x > 0.8 * $_playarea.width()) {
      $('.dropdown').css('right', 42);
    } else {
      $('.dropdown').css('left', 18);
    };
  };


  function _buildCharacterList() {
    var $characterList = $("<ul class='dropdown'></ul>");

    _characters.forEach( function(name) {
      var $listItem = $("<li>" + name + "</li>");
      $characterList.append($listItem);
    });

    return $characterList;
  };


  function _saveTag() {
    tagger['character'] = event.target.innerHTML;
    WALDO.ShowModule.saveTag(tagger);

    _characters.splice(_characters.indexOf(tagger.character),1)
    $('.dropdown').remove();
    $('.tagger').remove();

  }


  function renderSavedTag(tag) {
    $("<div class='tag'>" + tag.character_name + "</div>").appendTo($_playarea).css('left', tag.x - 24).css('top', tag.y - 24);
  };

/*
  function renderAllSavedTags(tags) {
    tags.forEach( _renderSingleTag );
  }
*/

  return {
    init: init,
    enable: enable,
    disable: disable,
    renderSavedTag: renderSavedTag
  }

})();