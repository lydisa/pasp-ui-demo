(function() {
    'use strict';
    
    /**
     * 控制器
     */
    angular.module('pasp.ui.seed')
        .controller('ConfirmDialogCtrl', function($modalInstance, $scope) {
            // 确定
            $scope.save = function() {
                $modalInstance.close();
            };

            // 取消
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        });
})();