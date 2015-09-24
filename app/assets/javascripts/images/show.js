var WALDO = WALDO || {};


WALDO.ShowModule = (function(){

  var _image_id
  var tags;
  var CHARACTERS;
  var AVAILABLE_CHARACTERS;


  function init() {
    _image_id = 1;
    CHARACTERS = ['Waldo', 'Wenda', 'Odlaw', 'Wizard Whitebeard', 'Woof'];
    AVAILABLE_CHARACTERS = CHARACTERS;
      WALDO.Tagger.init(AVAILABLE_CHARACTERS);
    _getTags();
  };


  function _getCharacters() {
    $.ajax( {
      url: "http://localhost:3000/images/" + _image_id + "/characters.json",
      method: 'get',

      success: function(data) { CHARACTERS = data }
    });
  }


  function _getTags() {
    $.ajax( {
      url: "http://localhost:3000/images/" + _image_id + "/tags.json",
      method: 'get',

      success: WALDO.Tagger.renderAllSavedTags,
      error: function() { console.log('error!') }
    });
  };


  function _availableCharacters() {
    var charnames = ch.responseJSON.map( function(c) { return c.name} );
    var tagged = ta.responseJSON.map( function(t) { return t.name} );

    return $.grep(charnames, function(c) {
      return (tagged.indexOf(c) === -1 )
    });
  }


  function saveTag(tagger) {
    $.ajax( {
      url: "http://localhost:3000/images/" + _image_id + "/tags.json",
      method: 'post',
      data: JSON.stringify(tagger),
      dataType: 'json',
      contentType: 'application/json',

      success: WALDO.Tagger.renderSavedTag,
      error: function() { console.log('error!') }
    });
  };


  function deleteTag(id) {
    $.ajax( {
      url: "http://localhost:3000/images/" + _image_id + "/tags/" + id + ".json",
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