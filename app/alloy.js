// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.CFG.HTTP_TIMEOUT_SECONDS = 7;
Alloy.CFG.BACKEND_ROOT_URL     = 'http://sinatra-api-demo.herokuapp.com';

// Lister for internet connection
var NETWORK_ONLINE = 'event_network_online';
var NETWORK_OFFLINE = 'event_network_offline';
Titanium.Network.addEventListener('change', function(e) {
  if(e.online) {
    Ti.App.fireEvent(NETWORK_ONLINE);
  }
  else {
    Ti.App.fireEvent(NETWORK_OFFLINE);
  }
});
