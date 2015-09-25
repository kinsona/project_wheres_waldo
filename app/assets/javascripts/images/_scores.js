WALDO = WALDO || {}


WALDO.Scores = (function () {

  var _player_id;
  var $_scorelist;


  function getHighScores(this_image_id) {
    $.ajax( {
      url: "/games.json",
      method: 'get',
      data: { image_id: this_image_id },
      dataType: 'json',
      contentType: 'application/json',

      success: _renderHighScores
    });
  };


  function _renderHighScores(scores) {
    _buildScoreboard()
    _fillScoreboard(scores)

    // if this game in list, ask for player name
    if( _player_id ) {
      var newName = prompt("You've got one of the fastest times!  Enter your name here for our scoreboard:");
      _setNewName(newName);
    };
  }


  function _buildScoreboard() {
    var $scoreboard = $("<div class='high-scores'></div>")
    $("<h4>Fastest Times</h4>").appendTo($scoreboard);

    $_scoreList = $("<ol class='score-list'></ol>")
    $_scoreList.appendTo($scoreboard);

    $scoreboard.appendTo($('.game-wrapper'));
  }


  function _fillScoreboard(scores) {
    var this_game_id = WALDO.ShowModule.getGameID();

    scores.forEach( function(score) {
      var $listItem = $("<li data-game-id='" + score.game_id + "'></li>");
      $listItem.text( score.name + ": " + score.time ).appendTo($_scoreList);

      _highlightCurrent(score, this_game_id);
    });
  };


  function _highlightCurrent(score, this_game_id) {
    if (score.game_id === this_game_id ) {
      $("li[data-game-id='" + this_game_id + "']").addClass('current');
      _player_id = score.player_id;
    };
  };


  function _setNewName(newName) {
    var player = { id: _player_id, name: newName };

    $.ajax( {
      url: "/players/" + _player_id + ".json",
      method: 'patch',
      data: JSON.stringify( {name: newName} ),
      dataType: 'json',
      contentType: 'application/json',

      success: _renderNewName,
      error: function() { console.log('error!') }
    });
  };


  function _renderNewName(player) {
    var $current = $('.current');
    var newText = $current.text().replace('Anonymous', player.name);
    $current.text(newText);
  };


  return {
    getHighScores: getHighScores
  }

})();