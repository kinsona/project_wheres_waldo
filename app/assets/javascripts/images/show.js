var WALDO = WALDO || {};


WALDO.tagger = (function(){

  function init() {
    this.enable();
  };


  function enable() {
    $('.game-image').on('click', buildTagger )
  };


  function disable() {
    
  };



  return {
    init: init,
    enable: enable,
    disable: disable
  }

})();

$(document).ready(function(){
  WALDO.tagger.init();
})