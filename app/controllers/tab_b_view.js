var args = arguments[0] || {};

$.container.showLoading('Loading Tab B');

var initialised = false;
exports.focusView = function focus() {
  if(initialised) {
    $.container.updateListIfErrorOrStale();
  } else {
    initialised = true;
    
    $.container.bindList({
      list:             $.listCollection, 
      listView:         $.chucknorris_list_view,
      staleSeconds:     5
    });
  }
};

function transformData(model) {
  var attrs = model.toJSON();

  // if we had an id associated with the model, we could associate it here:  
  // attrs.itemId = model.id;
  
  attrs.chuck_icon = "http://www.zeldauniverse.net/forums/image.php?u=5362454";

  return attrs;
}

function itemClick(e){
  var section = $.chucknorris_list_view.sections[e.sectionIndex];
  var item = section.getItemAt(e.itemIndex);
  console.log("clicked on item at itemId: " + e.itemIndex + " - " + JSON.stringify(e) + ")");
}