(function() {
    'use strict';

    /**
     * 控制器
     */
    angular.module('pasp.ui.seed')
        .controller('TableCtrl', function($scope, ConfirmDialog, Notification) {
            $scope.page = {
                currentPage: 1
            };

            // 删除
            $scope.delete = function() {
                ConfirmDialog.open().then(function () {
                    Notification.success('删除成功！');
                });
            };    
        });
})();
