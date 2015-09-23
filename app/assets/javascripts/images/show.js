var WALDO = WALDO || {};


WALDO.ShowModule = (function(){

  var tags;
  var CHARACTERS;
  var AVAILABLE_CHARACTERS;


  function init() {
    tags = [];
    CHARACTERS = ['Waldo', 'Wenda', 'Odlaw', 'Wizard Whitebeard', 'Woof'];
    AVAILABLE_CHARACTERS = CHARACTERS;
    WALDO.Tagger.init(AVAILABLE_CHARACTERS);
  };


  function saveTag(tagger) {
    tags.push(tagger);
  };




  return {
    init: init,
    saveTag: saveTag,
    getTags: function(){ return tags }
  }

})();


$(document).ready(function(){
  WALDO.ShowModule.init();
})