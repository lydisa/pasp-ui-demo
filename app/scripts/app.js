(function() {
    'use strict';

    angular
        .module('pasp.ui.seed', [
            'pasp.ui',
            'ngAnimate',
            'ngCookies',
            'ngResource'
        ])
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .otherwise('/home');

            $stateProvider
                .state('home', {
                    url: "/home",
                    templateUrl: "scripts/pages/home/home.view.html",
                    controller: 'HomeCtrl'
                })
                .state('page1', {
                    url: "/page1",
                    templateUrl: "scripts/pages/page1/page1.view.html",
                    controller: 'Page1Ctrl'
                })
                .state('page2', {
                    url: "/page2",
                    templateUrl: "scripts/pages/page2/page2.view.html",
                    controller: 'Page2Ctrl'
                });
        });
})();
