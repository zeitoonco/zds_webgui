/**
 * Created by Pedram2 on 8/30/2016.
 */

/**
 * @author v.lugovsky
 * created on 21.12.2015
 */

(function () {
    'use strict';
    var aid;
    var account = angular.module('ZDSGUI.pages.bms.list', ['ZDSGUI.boolean'])
        .config(routeConfig);


    account.controller('bms', function ($scope, zdsSocket, toastr, $uibModal) {
        $scope.ignoreChanges = false;

    });

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('bms.list', {
                url: '/bms/list',
                templateUrl: 'app/pages/bms/list/list.html',
                title: 'لیست ساختمان ها',
                sidebarMeta: {
                    order: 101
                }
            });
    }

})();
