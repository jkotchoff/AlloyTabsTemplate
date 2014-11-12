var args = arguments[0] || {};

$.container.showLoading('Loading Tab B');

var next_page = null;
var refreshFn = function(){
  $.listCollection.fetch({
    success: function(collection) {
      next_page = collection.next_page;
      $.container.hideLoading();
      $.container.hideWarning();
    },
    error: function(model, message){
      console.log("chuck norris fetch error: " + message);
      $.container.hideLoading();
      $.container.showWarning(message);
    }
  });
};

var performUpdateIfError = function(){
  if($.container.showingWarning) {
    $.container.hideWarning();
    
    refreshFn();
  }
};

Ti.App.addEventListener(NETWORK_ONLINE, performUpdateIfError);

var initialised = false;
exports.focusView = function focus() {
  if(initialised) {
    performUpdateIfError();
  } else {
    initialised = true;
    
    refreshFn();
  }
  console.log("Tab B focused");
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
