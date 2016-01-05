(function() {
    'use strict';

    /**
     * 头部(指令)
     */
    angular
        .module('pasp.ui.seed')
        .directive('uiHeaderWrap', function($rootScope, $cookieStore) {
            return {
                controller: 'HeaderWrapCtrl',
                replace: true,
                templateUrl: 'scripts/components/header-wrap/header-wrap.view.html'
            };
        });
})();