var args = arguments[0] || {};

$.container.showLoading('Loading Tab B');

var warning_showing = false;
$.warning_label.addEventListener("singletap", function(){
  if(warning_showing) {
    $.container.hideWarning();
  } else {
    $.container.showWarning("Sample warning message, eg. 'App Offline'");
  }
  warning_showing = !warning_showing;
});

var initialised = false;
exports.focusView = function focus() {
  if(!initialised) {
    // Simulate warning time
    setTimeout(function(){
      $.container.hideLoading();
    }, 800);
    initialised = true;
  }
  console.log("Tab B focused");
};
