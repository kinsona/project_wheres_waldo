var WALDO = WALDO || {};


WALDO.Characters = (function() {

  var characters;
  var available;


  function init() {

  };


  function setCharacters(array) {
    characters = array;
  };


  function getNames() {
    return characters.map( function(element) { return element.name} );
  };

  function getName(id) {
    return findCharacter(id).name;
  };


  function findCharacter(id) {
    var results = $.grep( characters, function(c) { return (c.id === id) } )
    return results[0];
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
    getNames: getNames,
    getName: getName
  }
})();