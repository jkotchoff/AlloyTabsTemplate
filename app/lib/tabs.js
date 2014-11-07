// This is mostly: 
// https://github.com/jasonkneen/com.jasonkneen.tabdemo/blob/master/app/lib/tabGroup.js
// 
// In this project, the native android actionbar is used instead of a quasi header view

// global vars
var tabGroup, win;

// create our tabGroup
exports.createTabGroup = function(args) {

  if (OS_IOS) {
    return Ti.UI.createTabGroup(args);    
  }

  // host heavyweight window
  win = Ti.UI.createWindow(args);

  // tabgroup is a view
  tabGroup = Ti.UI.createView({
    height : '55dp',
    bottom : 0,
    layout : "horizontal",
    backgroundColor : args.tabsBackgroundColor || "#CCC",
    backgroundImage : args.tabsBackgroundImage || null
  });

  win.add(tabGroup);

  // open the tabGroup window
  tabGroup.open = function() {
    Alloy.Globals.baseWin = win;
    win.addEventListener("open", function(){
      Ti.App.fireEvent('stocklight::tabgroup_opened');
    });
    win.open();
  };

  // position the tabs based on count / %age
  args.tabs.forEach(function(tab) {
    tabGroup.add(tab);
    var tab_width = (99 / args.tabs.length);

    if(tab.activeIcon.indexOf("market_filter") != -1){
      tab_width += 1;
    }

    tab_width = tab_width + "%";
    
    tab.setWidth(tab_width);

    tab.window.top = 0;
    tab.window.bottom = '55dp';
    tab.window.visible = false;

    win.add(tab.window);

    tab.window.children.forEach(function(child) {
      tab.window.add(child);
    });

  });

  args.tabs[0].window.visible = true;

  // set our default (first) tab
  var lastTab = args.tabs[0];

  // set initial highlights / active elements
  lastTab.icon.__backgroundImage = lastTab.icon.backgroundImage;
  lastTab.caption.__color = lastTab.caption.color;

  lastTab.icon.backgroundImage = lastTab.icon.backgroundActiveImage;
  lastTab.caption.color = lastTab.activeColor;

  tabGroup.activeTab = args.tabs[0];

  // clicking a tab
  tabGroup.addEventListener("click", function(e) {

    // if we have a lastTab, reset it
    if (lastTab) {
      lastTab.window.visible = false;
      lastTab.icon.backgroundImage = lastTab.icon.__backgroundImage;
      lastTab.caption.color = lastTab.caption.__color;
    }

    // make the tab window visible

    e.source.window.visible = true;

    // set the activeTab property
    tabGroup.activeTab = e.source;

    // hightlight the caption / icon
    e.source.icon.__backgroundImage = e.source.icon.backgroundImage;
    e.source.icon.backgroundImage = e.source.icon.backgroundActiveImage;

    e.source.caption.__color = e.source.caption.color;
    e.source.caption.color = e.source.activeColor;

    // emulate the focus event
    tabGroup.fireEvent("focus", {
      type : "focus",
      previousTab : lastTab,
      previousIndex : _.indexOf(args.tabs, lastTab),
      tab : e.source,
      index : _.indexOf(args.tabs, e.source),
      source : tabGroup
    });

    // save the current / last tab selected
    lastTab = e.source;

  });

  return tabGroup;
};

exports.createTab = function(args) {

  if (OS_IOS) {
    return Ti.UI.createTab(args);
  }

  // create an instance of a tab
  var tab = Ti.UI.createView(args);

  // if we have an icon, use it
  if (args.icon) {
    var icon = Ti.UI.createView({
      backgroundImage : args.icon,
      backgroundActiveImage : args.activeIcon,
      width : '26dp',
      height : '26dp',
      color : "#F00",
      top : '6dp',
      touchEnabled : false
    });
  }

  // create the caption
  var caption = Ti.UI.createLabel({
    text : args.title,
    color : args.color || "black",
    bottom : '2dp',
    textAlign : 'center',
    width: '100%',
    height: '14dp',
    font : {
      fontSize : '11dp'
    },
    touchEnabled : false
  });

  // cache the icon / caption against the tab, easier to get at later
  tab.icon = icon;
  tab.caption = caption;

  tab.add(icon);
  tab.add(caption);

  tab.open = function(args) {
    // double check we're dealing with a window
    if (args.toString().indexOf("TiUIWindow")) {
      args.open();
    } else {
      // throw the developer a bone
      throw "You need to pass a TiUIWindow";
    }

  };

  return tab;
};

exports.createWindow = function(args) {

  if (OS_IOS) {
    return Ti.UI.createWindow(args);
  }

  return Ti.UI.createView(args);
};