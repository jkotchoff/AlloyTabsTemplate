Alloy.Globals.tabGroup = $.getView();

function firstTabNavButtonHandler(e){
  alert('Tab A button click');
}

function secondTabNavButtonHandler(e){
  alert('Tab B button click');
}

var tab_group       = Alloy.Globals.tabGroup,
    menu            = null,
    action_bar      = null,
    TAB_A_BTN       = 1,
    TAB_B_BTN       = 2;

function androidShowMenuItem(item_id){
  if(OS_ANDROID && menu != null){
    // First loop through and hide anything that's showing, then 
    // enable the one we want (so we don't get flickering indentation)
    var selected = null;
    _.each(menu.items, function(menu_item, i) {
      if(menu_item.itemId == item_id){
        selected = menu_item;        
      } else {
        menu_item.setVisible(false);
      }
    });
    if(selected){
      selected.setVisible(true);
    }
  }
}

Ti.App.addEventListener('AlloyTabsTemplate::tabgroup_opened', function(){
  if(OS_ANDROID) {
    var activity = Alloy.Globals.baseWin.getActivity();
    action_bar = activity.actionBar; 
    action_bar.title = $.tab_a_window.title;
    activity.onCreateOptionsMenu = function(e) {
      menu = e.menu;
      var tab_a_btn = e.menu.add({
        showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
        visible: true,
        itemId: TAB_A_BTN,
        icon:   Ti.Android.R.drawable.ic_menu_zoom
      });
      tab_a_btn.addEventListener('click', firstTabNavButtonHandler);
      
      var tab_b_btn = e.menu.add({
        showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
        visible: false,
        itemId: TAB_B_BTN,
        icon:   Ti.Android.R.drawable.ic_menu_search
      });
      tab_b_btn.addEventListener('click', secondTabNavButtonHandler);
    };
    activity.invalidateOptionsMenu();
  }
});

// Given the Android tabs are implemented as Views instead of Windows, 
// handle focus events manually
//
// Also, because we are using buttons in the action bar, show/hide them here
tab_group.addEventListener("focus", function(e) {
  var tab_id;
  try{
      // Handle tapping of a 'more' tab item on iOS to bring up a menu of other options (it doesn't fire e.tab)
     tab_id = (e.tab) ? e.tab.id : tab_group.activeTab.id;
  } catch(e){ return; } 

  if(tab_id == "tab_a"){
    if(OS_ANDROID) { action_bar.title = $.tab_a_window.title; }
    $.tab_a_view.focusView();
    androidShowMenuItem(TAB_A_BTN);
  } else if(tab_id == "tab_b"){
    if(OS_ANDROID) { action_bar.title = $.tab_b_window.title; }
    $.tab_b_view.focusView();
    androidShowMenuItem(TAB_B_BTN);
  }
});

tab_group.open();
