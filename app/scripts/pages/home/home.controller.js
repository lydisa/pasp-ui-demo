(function() {
    'use strict';

    /**
     * 控制器
     */
    angular.module('pasp.ui.seed')
        .controller('HomeCtrl', function($scope) {
            $scope.title = "欢迎使用PASP UI";
            $scope.content = "开始使用PASP UI搭建WEB项目。";
        });
})();
