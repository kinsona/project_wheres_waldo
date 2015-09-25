var WALDO = WALDO || {}


WALDO.Tags = (function() {

  var tags;


  function setTags(array) {
    tags = array;
  };


  function addSavedTag(tag) {
    tags.push(tag);
    _render(tag);
    WALDO.Characters.removeAvailable(tag.character.name)
  };


  function _ids() {
    return tags.map( function(tag) { return tag.id } );
  };


  function characterIDs() {
    return tags.map( function(tag) { return tag.character_id } );
  }


  function renderAll() {
    tags.forEach( _render );
  };


  function _render(tag) {
    var $playarea = $('.game-wrapper');
    var characterName = WALDO.Characters.getName(tag.character_id);

    var pixelX = tag.x * $playarea.width() + $playarea.offset().left - 24;
    var pixelY = tag.y * $playarea.height() + $playarea.offset().top - 24;
    $("<div class='tag' data-tag-id='" + tag.id + "'>" + characterName + "</div>").appendTo($playarea).css('left', pixelX).css('top', pixelY);
  };


  return {
    setTags: setTags,
    addSavedTag: addSavedTag,
    characterIDs: characterIDs,
    renderAll: renderAll,
  }

})();