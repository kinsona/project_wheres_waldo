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
    $.ajax( {
      url: 'http://localhost:3000/images/1/tags.json',
      method: 'post',
      data: JSON.stringify(tagger),
      dataType: 'json',
      contentType: 'application/json',

      success: WALDO.Tagger.renderSavedTag,
      error: function() { console.log('error!') }
    });
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