var WALDO = WALDO || {};


WALDO.ShowModule = (function(){

  var _image_id;
//  var _tags;
//  var _characters;
//  var _availableCharacters;


  function init() {
    _image_id = $('section').data('image-id');
    _getImageData();
  };


  function _getImageData() {
    $.ajax( {
      url: "http://localhost:3000/images/" + _image_id + ".json",
      method: 'get',
      success: _pullVariables
    });
  };


  function _pullVariables(data) {
    //_characters = data.characters;
    WALDO.Characters.setCharacters(data.characters);
    WALDO.Tags.setTags(data.tags);
    //_tags = data.tags
    //_availableCharacters = _availableCharacters();

    var taggedIDs = WALDO.Tags.ids();
    WALDO.Characters.setAvailable(taggedIDs);

    WALDO.Tagger.init(WALDO.Characters.getAvailable());
    //_getTags();
    WALDO.Tags.renderAll();
  };

/*
  function _getCharacters() {
    $.ajax( {
      url: "http://localhost:3000/images/" + _image_id + "/characters.json",
      method: 'get',

      success: function(data) { CHARACTERS = data }
    });
  }
*/
/*
  function _getTags() {
    $.ajax( {
      url: "http://localhost:3000/images/" + _image_id + "/tags.json",
      method: 'get',

      success: WALDO.Tagger.renderAllSavedTags,
      error: function() { console.log('error!') }
    });
  };
*/
/*
  function _getNames(array) {
    return array.map( function(element) { return element.name} );
  };


  function _availableCharacters() {
    var charnames = _getNames(_characters);
    var tagged = _getNames(_tags);
    // this is not working because _tags doesn't have name
    console.log(_tags);

    return $.grep(charnames, function(c) {
      return (tagged.indexOf(c) === -1 )
    });
  }
*/

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