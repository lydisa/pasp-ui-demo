(function() {
    'use strict';

    angular
        .module('pasp.ui.seed')
        .provider('ConfirmDialog', function() {
            
            this.options = {
                templateUrl: 'scripts/components/confirm-dialog/confirm-dialog.view.html',
                controller: 'ConfirmDialogCtrl',
                windowClass: 'confirm-dialog'
            };

            this.$get = function($uiModal) {
                var options = this.options;
                var open = function() {
                    var modalInstance = $uiModal.open({
                        templateUrl: options.templateUrl,
                        controller: options.controller,
                        windowClass: options.windowClass
                    });

                    return modalInstance.result;
                };

                return {
                    open: open
                };
            };
        });
})();