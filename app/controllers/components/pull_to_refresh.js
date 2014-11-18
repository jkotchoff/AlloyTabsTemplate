var args = arguments[0] || {};

// Pass in:
// args.refresh_label
// args.list_view
// args.refreshFn

var refreshFn = null;

function getFormattedDate() {
  var moment = require('alloy/moment');
  return moment().calendar();
}

$.ptr_last_updated.text = 'Last Updated: ' + getFormattedDate();
$.ptr_status.text = 'Pull down to refresh...';

exports.setRefreshFn = function(fn) {
  refreshFn = fn;
};

exports.pullListener = function(e) {
  if (e.active == false) {
    var unrotate = Ti.UI.create2DMatrix();
    $.ptr_arrow.animate({transform:unrotate, duration:180});
    $.ptr_status.text = 'Pull down to refresh...';
  } else {
    var rotate = Ti.UI.create2DMatrix().rotate(180);
    $.ptr_arrow.animate({transform:rotate, duration:180});
    $.ptr_status.text = 'Release to get ' + args.refresh_label + '...';
  }
};

exports.pullendListener = function(e) {
  $.ptr_status.text = 'Loading ' + args.refresh_label + '...';        
  $.ptr_arrow.hide();
  $.ptr_activity_indicator.show();
  args.list_view.setContentInsets({top:80}, {animated:true});
  refreshFn();
};

exports.reset = function(e) {
  $.ptr_activity_indicator.hide();
  $.ptr_arrow.transform = Ti.UI.create2DMatrix();
  $.ptr_arrow.show();
  $.ptr_status.text = 'Pull down to refresh...';
  $.ptr_last_updated.text = 'Last Updated: ' + getFormattedDate();
  args.list_view.setContentInsets({top:0}, {animated:true});
};

exports.cleanup = function(){
  refreshFn = null;
  $.destroy();
  $.off();
};
