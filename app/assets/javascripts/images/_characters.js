var WALDO = WALDO || {};


WALDO.Characters = (function() {

  var characters;
  var available;


  function init() {

  };


  function setCharacters(array) {
    characters = array;
  };


  function names() {
    return characters.map( function(element) { return element.name} );
  };


  function find(id) {
    return $.grep( characters, function(c) { return (c.id === id) } )
  };


  function setAvailable(taggedIDs) {
    available = $.grep(characters, function(c) {
      return (taggedIDs.indexOf(c.id) === -1)
    });
    return available;
  };


  return {
    init: init,
    getCharacters: function() { return characters },
    setCharacters: setCharacters,
    getAvailable: function() { return available },
    setAvailable: setAvailable,
    names: names
  }
})();