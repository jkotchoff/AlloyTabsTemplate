var args = arguments[0] || {};

$.container.showLoading('Loading Tab B');

var initialised = false;
exports.focusView = function focus() {
  if(initialised) {
    $.container.updateListIfErrorOrStale();
  } else {
    initialised = true;
    
    $.container.bindList({
      pullToRefresh:    true,
      infiniteScroll:   true,
      refreshLabel:     "Chuck Norris quotes",
      list:             $.listCollection, 
      listView:         $.chucknorris_list_view,
      staleSeconds:     10 * 60
    });
  }
};

// This could be called to clean up memory if we closed this window
exports.cleanup = function(){
  $.destroy();
  $.off();
  $.container.cleanup();
};

function transformData(model) {
  var attrs = model.toJSON();

  // if we had an id associated with the model, we could associate it here:  
  // attrs.itemId = model.id;
  
  attrs.chuck_icon = "/images/chuck_norris.png";

  return attrs;
}

function itemClick(e){
  var section = $.chucknorris_list_view.sections[e.sectionIndex];
  var item = section.getItemAt(e.itemIndex);
  console.log("clicked on item at itemId: " + e.itemIndex + " - " + JSON.stringify(e) + ")");
}