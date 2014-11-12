exports.createListView = function(args) {
  var list_view = Ti.UI.createListView(args);
  
  if(OS_IOS) {
    list_view.addEventListener('itemclick', function(e){
      //console.log(e.itemId + ", " + e.bindId + ", " + "Section Index: " + e.sectionIndex + ", Item Index: " + e.itemIndex);
  
      // De-select table as per: http://developer.appcelerator.com/question/163199/listview-item-select-staying-selected-on-ios-only-android-works-as-expected
      setTimeout(function(){
        list_view.deselectItem(e.sectionIndex, e.itemIndex);
      }, 70);        
    });
  }

  return list_view;
};