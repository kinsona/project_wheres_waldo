var WALDO = WALDO || {};


WALDO.ShowModule = (function(){

  var _image_id;


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
    WALDO.Characters.setCharacters(data.characters);
    WALDO.Tags.setTags(data.tags);

    var taggedIDs = WALDO.Tags.characterIDs();
    WALDO.Characters.setAvailable(taggedIDs);

    WALDO.Tagger.init(WALDO.Characters.getAvailable());
    WALDO.Tags.renderAll();
  };


  function saveTag(tagger) {
    $.ajax( {
      url: "http://localhost:3000/images/" + _image_id + "/tags.json",
      method: 'post',
      data: JSON.stringify(tagger),
      dataType: 'json',
      contentType: 'application/json',

      success: WALDO.Tags.addSavedTag,
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