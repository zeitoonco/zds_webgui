/**
 * Created by Pedram2 on 8/30/2016.
 */

/**
 * @author v.lugovsky
 * created on 21.12.2015
 */

(function () {
    'use strict';
    //var aid;
    var list = angular.module('ZDSGUI.pages.bms.area', ['ZDSGUI.boolean'])
        .config(routeConfig);

    list.controller('area', function ($scope, zdsSocket, toastr, $uibModal) {
        $scope.ignoreChanges = false;
        $scope.value = '789';
        $scope.options = {
            size: 4,
            align: 'left'

        };
    });
    list.controller('bms2', function ($scope, zdsSocket, toastr, $uibModal) {
        $scope.ignoreChanges = false;
    });
    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('bms.list', {
                url: '/bms/list',
                templateUrl: 'app/pages/bms/list/list.html',
                permission: 'AccountingRelay',
                title: 'مناطق',
                sidebarMeta: {
                    order: 101
                }
            });
    }

})();
