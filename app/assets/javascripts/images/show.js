var WALDO = WALDO || {};


WALDO.ShowModule = (function(){

  var game_id;


  function init() {
    game_id = $('section').data('game-id');
    _getImageData();
  };


  function _getImageData() {
    $.ajax( {
      url: game_id + ".json",
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

    WALDO.Timer.startTimer();
  };


  function saveTag(tagger) {
    $.ajax( {
      url: game_id + "/tags.json",
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
      url: game_id + "/tags/" + id + ".json",
      method: 'delete',

      success: WALDO.Tagger.removeSavedTag,
      error: function() { console.log('error!') }
    })
  }


  function endGame() {
    var game = { id: game_id };

    $.ajax( {
      url: game_id + ".json",
      method: 'patch',
      data: JSON.stringify(game),
      dataType: 'json',
      contentType: 'application/json',

      success: _showResults,
      error: _showIncomplete
    });
  };


  function _showResults(game) {
    WALDO.Timer.stopTimer();
    WALDO.Tagger.disable();
    WALDO.Scores.getHighScores(game.image_id)
  };


  function _showIncomplete() {
    WALDO.Scores.gameNotOver();
  };


  return {
    init: init,
    getGameID: function() { return game_id },
    saveTag: saveTag,
    deleteTag: deleteTag,
    endGame: endGame
  }

})();


$(document).ready(function(){

  if( $("[data-controller='games'][data-action='show']").length === 1 ) {
    WALDO.ShowModule.init();
  };

})