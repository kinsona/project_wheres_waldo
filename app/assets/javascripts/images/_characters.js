var WALDO = WALDO || {};


WALDO.Characters = (function() {

  var characters;
  var available;


  function setCharacters(array) {
    characters = array;
  };


  function getName(id) {
    return findCharacter(id).name;
  };


  function findCharacter(id) {
    var results = $.grep( characters, function(c) { return (c.id === id) } );
    return results[0];
  };


  function findByName(name) {
    var results = $.grep( characters, function(c) { return (c.name === name) } );
    return results[0];
  };


  function setAvailable(taggedIDs) {
    available = $.grep(characters, function(c) {
      return (taggedIDs.indexOf(c.id) === -1)
    });
    return available;
  };


  function removeAvailable(name) {
    available = $.grep( available, function(a) { return (a.name !== name) } );
    if ( available.length === 0 ) {
      WALDO.ShowModule.endGame()
    }
  };


  function addAvailable(name) {
    var character = findByName(name);
    if (available.indexOf(character) === -1) {
      available.push(character);
    };
  };


  function getAvailableNames() {
    return available.map( function(element) { return element.name} );
  };


  return {
    setCharacters: setCharacters,
    getAvailable: function() { return available },
    getAvailableNames: getAvailableNames,
    setAvailable: setAvailable,
    removeAvailable: removeAvailable,
    addAvailable: addAvailable,
    getName: getName
  }

})();