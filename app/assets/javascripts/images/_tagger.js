var WALDO = WALDO || {};


WALDO.Tagger = (function(){

  var $_playarea;
  var tagger;


  function init(available_characters) {
    $_playarea = $('.game-wrapper');
    _enable();
  };


  function _enable() {
    $_playarea.on('click', '.game-image', _toggleTagger );
    $_playarea.on('click', '.dropdown li', _saveTag );
    $_playarea.on('click', '.tag', _promptDelete );
    $_playarea.on('mouseenter', function() { $('.tag').show() } );
    $_playarea.on('mouseleave', function() { $('.tag').hide() } );
  };


  function _disable() {
    $_playarea.off('click');
  };


  function _toggleTagger() {
    var tagger = $('.tagger');
    if (tagger.length === 0) {
      _buildTagger()
    } else {
      tagger.remove();
    };
  };


  function _buildTagger() {
    var x = event.offsetX / $_playarea.width();
    var y = event.offsetY / $_playarea.height();
    tagger = new Tag(x, y);

    tagger.render()
    tagger.showDropdown();
  };


  function Tag(x, y) {
    this.x = x;
    this.y = y;
  };


  Tag.prototype.render = function() {
    var pixelX = this.x * $_playarea.width() + $_playarea.offset().left - 24;
    var pixelY = this.y * $_playarea.height() + $_playarea.offset().top - 24;

    $("<div class='tagger'></div>").appendTo($_playarea).css('left', pixelX).css('top', pixelY);
  };


  Tag.prototype.showDropdown = function() {
    var $characterList = _buildCharacterList();

    var $tagger = $('.tagger');
    $characterList.appendTo($tagger).hide().slideDown();

    this.setDropdownCoordinates();
  };


  Tag.prototype.setDropdownCoordinates = function() {
    if (this.x > 0.8) {
      $('.dropdown').css('right', 42);
    } else {
      $('.dropdown').css('left', 18);
    };
  };


  function _buildCharacterList() {
    var $characterList = $("<ul class='dropdown'></ul>");

    WALDO.Characters.getAvailableNames().forEach( function(name) {
      var $listItem = $("<li>" + name + "</li>");
      $characterList.append($listItem);
    });

    return $characterList;
  };


  function _saveTag() {
    tagger['character'] = event.target.innerHTML;
    WALDO.ShowModule.saveTag(tagger);

    $('.dropdown').remove();
    $('.tagger').remove();
  }


  function _promptDelete() {
    var $tag = $(event.target);
    $tag.addClass('delete-prompt');

    if ( confirm('Delete this tag?') ){
      WALDO.ShowModule.deleteTag($tag.attr('data-tag-id'));
    } else {
      $tag.removeClass('delete-prompt')
    };
  };



  function removeSavedTag(id) {
    $tagDiv = $("div[data-tag-id='" + id + "']");
    WALDO.Characters.addAvailable($tagDiv.text());
    $tagDiv.remove()
  };




  return {
    init: init,
    removeSavedTag: removeSavedTag
  }

})();