var WALDO = WALDO || {};


WALDO.ShowModule = (function(){

  function init() {
    WALDO.Tagger.init();
  };

  return {
    init: init
  }

})();


$(document).ready(function(){
  WALDO.ShowModule.init();
})