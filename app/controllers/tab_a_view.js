var args = arguments[0] || {};

$.open_label.addEventListener("singletap", function(){
  var secondLevelWindow = Alloy.createController("sub_window").getView();
  Alloy.Globals.tabGroup.activeTab.open(secondLevelWindow);
});

exports.focusView = function focus() {
  console.log("Tab A focused");
};
