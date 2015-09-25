var WALDO = WALDO || {};


WALDO.ShowModule = (function(){

  var _game_id;


  function init() {
    _game_id = $('section').data('game-id');
    _getImageData();
  };


  function _getImageData() {
    $.ajax( {
      url: "http://localhost:3000/games/" + _game_id + ".json",
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
      url: "http://localhost:3000/games/" + _game_id + "/tags.json",
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
      url: "http://localhost:3000/images/" + _game_id + "/tags/" + id + ".json",
      method: 'delete',

      success: WALDO.Tagger.removeSavedTag,
      error: function() { console.log('error!') }
    })
  }


  function endGame() {
    var game = { id: _game_id };

    $.ajax( {
      url: "http://localhost:3000/games/" + _game_id + ".json",
      method: 'patch',
      data: JSON.stringify(game),
      dataType: 'json',
      contentType: 'application/json',

      success: _showResults,
      error: function() { console.log('error!') }
    });
  };


  function _showResults(game) {
    WALDO.Timer.stopTimer();
    WALDO.Tagger.disable();
    _getHighScores(game.image_id)
  };


  function _getHighScores(this_image_id) {
    $.ajax( {
      url: "http://localhost:3000/games.json",
      method: 'get',
      data: { image_id: this_image_id },
      dataType: 'json',
      contentType: 'application/json',

      success: _renderHighScores
    });
  }


  function _renderHighScores(scores) {
    // create a div in center of screen with a list of names/scores
    var $scoreboard = $("<div class='high-scores'></div>")
    $("<h4>Fastest Times</h4>").appendTo($scoreboard);

    var $scoreList = $("<ol class='score-list'></ol>")
    $scoreList.appendTo($scoreboard);

    $scoreboard.appendTo($('.game-wrapper'));

    scores.forEach( function(score) {
      var $listItem = $("<li data-game-id='" + score.game_id + "'></li>");
      $listItem.text( score.name + ": " + score.time ).appendTo($scoreList);

      // highlight current score
      if (score.game_id === _game_id) {
        $("li[data-game-id='" + _game_id + "']").addClass('current');
      }
    });

    // if this game in list, ask for player name
    if( $('.current').length === 1) {
      var newName = prompt("You've got one of the fastest times!  Enter your name here for our scoreboard:");
      _setNewName(newName);
    };
  }


  function _setNewName(name) {
    console.log(name);
    // update name in front and back ends (default 'anonymous')
  }


  return {
    init: init,
    saveTag: saveTag,
    deleteTag: deleteTag,
    endGame: endGame
  }

})();


$(document).ready(function(){
  WALDO.ShowModule.init();
})