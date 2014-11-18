# Alloy tabs template

Click this image to view a video demo of this project:
[![1m 13s Video demo of this app](http://img.youtube.com/vi/DR4HG4gVsRQ/0.jpg)](http://www.youtube.com/watch?v=DR4HG4gVsRQ)

*1 minute, 13 seconds (Youtube)*

This project features
* An Instagram style [cross platform tabbar](https://github.com/jkotchoff/AlloyTabsTemplate/commit/9239dd8565b1468d07a7970edb5a7b2fe37e2cf6) based on [jasonkneen/com.jasonkneen.tabdemo](https://github.com/jasonkneen/com.jasonkneen.tabdemo)
* [Android Action bar buttons and back navigation](https://github.com/jkotchoff/AlloyTabsTemplate/commit/e22d03f603a9d68b7a0d5ddedfce520e72f0eae2)
* Ti.Notifications [above a ListView](https://github.com/jkotchoff/AlloyTabsTemplate/commit/599d2aa606f0096916d93da71264a6933703d551)
* [ListView collection binding](https://github.com/jkotchoff/AlloyTabsTemplate/commit/ef844ab5f327b12474ef69ad143e858a450026e0)
* Native swipe to refresh on [iOS](https://github.com/jkotchoff/AlloyTabsTemplate/commit/3a163a60d2ff5d0bb3d047e2769cf65eb05a0a42) and [Android](https://github.com/jkotchoff/AlloyTabsTemplate/commit/a52225bbfe5aa292198ab1fe9eb65eaeaef4fb39) (based on the iOS [ListView example](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.ListView) and the android [iskugor/Ti.SwipeRefreshLayout widget](https://github.com/iskugor/Ti.SwipeRefreshLayout))
* [Infinite scrolling](https://github.com/jkotchoff/AlloyTabsTemplate/commit/7ba6b76478e5cca7d62f68348994e10009cf6e90) of the listview using [FokkeZB/nl.fokkezb.infiniteScroll](https://github.com/FokkeZB/nl.fokkezb.infiniteScroll)

It follows on from the pull to refresh concepts pioneered by:
* [FokkeZB/nl.fokkezb.pullToRefresh](https://github.com/FokkeZB/nl.fokkezb.pullToRefresh)
* [jolicode/Alloy-PullToRefresh](https://github.com/jolicode/Alloy-PullToRefresh)

## Listview binding
As much as possible, the logic to bind the behaviours to the ListView have been encapsulated in the [container.js module](https://github.com/jkotchoff/AlloyTabsTemplate/blob/master/app/lib/container.js)

The [alloy controller](https://github.com/jkotchoff/AlloyTabsTemplate/blob/master/app/controllers/tab_b_view.js) looks like:
```
...
    $.container.bindList({
      pullToRefresh:    true,
      infiniteScroll:   true,
      refreshLabel:     "Chuck Norris quotes",
      list:             $.listCollection, 
      listView:         $.chucknorris_list_view,
      staleSeconds:     10 * 60
    });
...
```

## Why use a custom Tab Group for android?
It's an Instagram-style attempt to make it easier to reach the main navigation 

It was influenced by [this tweet](https://twitter.com/FokkeZB/status/528069812438978560) from [@FokkeZB](https://twitter.com/FokkeZB):
[![Conclusion: no more hamburgers](https://pbs.twimg.com/media/B1PbzuxIYAANdj4.png)](https://twitter.com/FokkeZB/status/528069812438978560)

and the [jasonkneen/com.jasonkneen.tabdemo](https://github.com/jasonkneen/com.jasonkneen.tabdemo) module.

It does however break the Android tab-bar convention so depending on your position, perhaps it would be better to go native for that?


## Pull to refresh API
The pull to refresh widget is calling a dummy JSON API as per:
[https://github.com/jkotchoff/sinatra_api_demo](https://github.com/jkotchoff/sinatra_api_demo)

It's hosted on heroku and the instance is automatically spun down when not in use so you may see a timeout error on your first request to get awesome Chuck Norris quotes

## Wishlist
* [Badge counter](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.Tab-property-badge) for Android tabs
* Usage of the [pull_to_refresh](https://github.com/jkotchoff/AlloyTabsTemplate/blob/master/app/views/components/pull_to_refresh.xml) controller for the Android swipe refresh widget to display last update time
* [SearchBar](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.SearchBar) to send queries to the JSON API server

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Shameless plug
This was open sourced out of

http://stocklight.com

If there are any Titanium developers out there interested in helping us out to unseat Yahoo Finance in the app space, [please get in touch](http://www.linkedin.com/profile/view?id=4438341). Remote contributions welcomed and our preference would be to get a Titan on board for an equity stake.
