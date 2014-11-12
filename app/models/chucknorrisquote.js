exports.definition = {
  config: {
    columns: {
      title: 'TEXT'
    },
    adapter: {
      type: 'json',
      url: Alloy.CFG.BACKEND_ROOT_URL + "/endpoint.json"
    }
  },

  // Inspired by:
  // http://developer.appcelerator.com/question/159731/alloy---problem-binding-collection-to-listview
  // https://gist.github.com/aroop/4534473
  // https://developer.appcelerator.com/question/153329/passing-arguments-to-my-backbone-model
  extendCollection: function(Collection) {    
    _.extend(Collection.prototype, {
      parse : function(_resp, xhr) {
        this.next_page = _resp.next_page;
        
        // convert JSON response into Chuck Norris model objects
        var truths = [];
        _.each(_resp['chuck_norris_quotes'], function(truth){
          truths.push({
            "title": truth
          });
        });

        return truths;
      }
    });

    return Collection;
  }
};