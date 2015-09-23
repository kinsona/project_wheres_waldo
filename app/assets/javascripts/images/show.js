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
    getTags();
  };


  function saveTag(tagger) {
    $.ajax( {
      url: 'http://localhost:3000/images/7/tags.json',
      method: 'post',
      data: JSON.stringify(tagger),
      dataType: 'json',
      contentType: 'application/json',

      success: WALDO.Tagger.renderSavedTag,
      error: function() { console.log('error!') }
    });
  };


  function getTags() {
    $.ajax( {
      url: 'http://localhost:3000/images/7/tags.json',
      method: 'get',

      success: WALDO.Tagger.renderAllSavedTags,
      error: function() { console.log('error!') }
    });
  };


  return {
    init: init,
    saveTag: saveTag,
    getTags: getTags
  }

})();


$(document).ready(function(){
  WALDO.ShowModule.init();
})