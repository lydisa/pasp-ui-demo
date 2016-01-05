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
                .otherwise('/');

            $stateProvider
                .state('/', {
                    url: "/",
                    templateUrl: "scripts/pages/home/home.view.html",
                    controller: 'HomeCtrl'
                })
                .state('table', {
                    url: "/table",
                    templateUrl: "scripts/pages/table/table.view.html",
                    controller: 'TableCtrl'
                })
                .state('form', {
                    url: "/form",
                    templateUrl: "scripts/pages/form/form.view.html",
                    controller: 'FormCtrl'
                })
                .state('article', {
                    url: "/article",
                    templateUrl: "scripts/pages/article/article.view.html"
                });
        });
})();
