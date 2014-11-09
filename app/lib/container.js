exports.createView = function(args) {
  var view = Ti.UI.createView(args);
  var notifier_area = Ti.UI.createView({height: 0});
  var animation_duration = OS_IOS ? 2000 : 250; // bizarre. not sure why this was required to make the iOS animation work..
  var notifier = Alloy.createWidget('com.caffeinalab.titanium.notifications', {
    animationDuration: animation_duration,
    permanentlyVisible: true,
    view: notifier_area,
    icon: '/images/icon_warning.png' 
  });
  view.add(notifier_area);
  view.showingWarning = false;

  view.showWarning = function(message) {
    if(view.showingWarning) { return; }
    notifier_area.height = '65dp';
    notifier.show({
      message: message
    });
    view.showingWarning = true;
    
    setTimeout(function(){
      // Needed to preven the notification from dissapearing when the tab loses and then regains focus
      notifier_area.children[0].top = 0;
    }, animation_duration + 1);
  };

  view.hideWarning = function() {
    if(!view.showingWarning) { return; }
    notifier.hide();
    notifier_area.height = 0;
    view.showingWarning = false;
  };
  
  var loading_panel = Alloy.createController('components/loading', {message: ''});
  var loading_view = loading_panel.getView();
  view.add(loading_view);
  
  view.showLoading = function(message){
    loading_panel.setMessage(message);
    loading_view.visible = true;
    loading_view.height = '100%';
  };
  
  view.hideLoading = function(){
    loading_view.visible = false;
    loading_view.height = 0;
  };

  return view;
};