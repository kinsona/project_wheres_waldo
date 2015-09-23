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
    _getTags();
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


  function _getTags() {
    $.ajax( {
      url: 'http://localhost:3000/images/7/tags.json',
      method: 'get',

      success: WALDO.Tagger.renderAllSavedTags,
      error: function() { console.log('error!') }
    });
  };


  function deleteTag(id) {
    $.ajax( {
      url: "http://localhost:3000/images/7/tags/" + id + ".json",
      method: 'delete',

      success: WALDO.Tagger.removeSavedTag,
      error: function() { console.log('error!') }
    })
  }


  return {
    init: init,
    saveTag: saveTag,
    deleteTag: deleteTag
  }

})();


$(document).ready(function(){
  WALDO.ShowModule.init();
})