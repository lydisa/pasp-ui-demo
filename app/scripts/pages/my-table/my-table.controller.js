(function() {
    'use strict';

    /**
     * 控制器
     */
    angular.module('pasp.ui.seed')
        .controller('MyTableCtrl', function($scope, ConfirmDialog, Notification) {
            $scope.searchValue = "在这里进行搜索";
            $scope.table = [
                {
                    state:"进行中",
                    name:"任务一",
                    memo:"显示一个表格"
                },
                {
                    state:"未进行",
                    name:"任务二",
                    memo:"弹出窗口"
                },
                {
                    state:"未进行",
                    name:"任务三",
                    memo:"传递数据"
                }
            ]

            // 删除
            $scope.delete = function(index) {
                ConfirmDialog.open().then(function () {
                    $scope.table.splice(index, 1);
                    Notification.success('删除成功！');
                });
            };
        });
})();
