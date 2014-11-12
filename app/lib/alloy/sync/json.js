function Sync(method, model, opts) {
  if (method !== 'read') {
    throw 'This sync adapter only reads.';
  } else {
    if (Ti.Network.online) {
      var xhr = Ti.Network.createHTTPClient({
        enableKeepAlive: false, 
        
        timeout: Alloy.CFG.HTTP_TIMEOUT_SECONDS * 1000,
        
        onload: function() {
          try {
            var values = JSON.parse(this.responseText);
            model.length = values.length;
            opts.success((model.length === 1) ? values[0] : values, this.responseText);
          } catch (e) {
            var error = this.responseText;
            if(error == "") {
              error = "Tabs app error";
            }
            opts.error(model, this.responseText);
          }
        },
        onerror: function(e) {
          var error = this.responseText;
          if(error == "") {
            error = "Tabs app server is offline";
          }
          console.log("error: " + error + " calling: " + url);
          opts.error(model, error);
        }
      });

      var url = model.config.adapter.url;
      if (opts.params) {
        url += opts.params;
      }
      xhr.open('GET', url);
      console.log("fetching: " + url);
      xhr.send();
    } else {
      opts.error(model, 'Network is offline');
    }
  }
}

exports.sync = Sync;