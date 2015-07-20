'use strict'

angular.module '<%= scriptAppName %>', [<%= angularModules %>]
<% if(filters.ngroute) { %>.config ($routeProvider, $locationProvider) ->
  $routeProvider
  .otherwise
    redirectTo: '/'

  $locationProvider.html5Mode true
<% } %><% if(filters.uirouter) { %>.config ($stateProvider, $urlRouterProvider, $locationProvider) ->
  $urlRouterProvider
  .otherwise '/'

  $locationProvider.html5Mode true
<% } %>