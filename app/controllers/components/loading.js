var args = arguments[0] || {};

$.loadinglbl.text = args.message;

exports.setMessage = function(message) {
  $.loadinglbl.text = message;
};
