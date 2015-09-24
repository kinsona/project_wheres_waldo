var WALDO = WALDO || {}


WALDO.Tags = (function() {

  var tags;


  function init() {

  };


  function setTags(array) {
    tags = array;
  };


  function ids() {
    return tags.map( function(tag) { return tag.id } );
  };


  function characterIDs() {
    return tags.map( function(tag) { return tag.character_id } );
  }


  function renderAll() {
    tags.forEach( render );
  };


  function render(tag) {
    var $playarea = $('.game-wrapper');
    var characterName = WALDO.Characters.getName(tag.character_id);

    var pixelX = tag.x * $playarea.width() + $playarea.offset().left - 24;
    var pixelY = tag.y * $playarea.height() + $playarea.offset().top - 24;
    $("<div class='tag' data-tag-id='" + tag.id + "'>" + characterName + "</div>").appendTo($playarea).css('left', pixelX).css('top', pixelY);
  };


  return {
    init: init,
    getTags: function() { return tags },
    setTags: setTags,
    ids: ids,
    characterIDs: characterIDs,
    renderAll: renderAll,
    render: render
  }

})();