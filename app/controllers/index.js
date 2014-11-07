Alloy.Globals.tabGroup = $.getView();

// Given the Android tabs are implemented as Views instead of Windows, 
// handle focus events manually
//
// Also, because we are using buttons in the action bar, show/hide them here
Alloy.Globals.tabGroup.addEventListener("focus", function(e) {
  var tab_id;
  try{
      // Handle tapping of a 'more' tab item on iOS to bring up a menu of other options (it doesn't fire e.tab)
     tab_id = (e.tab) ? e.tab.id : Alloy.Globals.tabGroup.activeTab.id;
  } catch(e){ return; } 

  if(tab_id == "tab_a"){
    $.tab_a_view.focusView();
  } else if(tab_id == "tab_b"){
    $.tab_b_view.focusView();
  }
});

Alloy.Globals.tabGroup.open();
