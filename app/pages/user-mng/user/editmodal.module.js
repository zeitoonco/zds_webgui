/**
 * Created by asus iran on 8/30/2016.
 */
(function () {
    'use strict';

    angular.module('ZDSGUI.pages.ui.notifications')
        .controller('ModalsPageCtrl', ModalsPageCtrl);

    /** @ngInject */
    function ModalsPageCtrl($scope, $uibModal) {
        $scope.open = function (page, size) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };
    }


})();
