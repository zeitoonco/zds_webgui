/**
 * Created by Pedram2 on 8/30/2016.
 */

/**
 * @author v.lugovsky
 * created on 21.12.2015
 */
(function () {
    'use strict';

    var account = angular.module('ZDSGUI.pages.accounting.accounts', [])
        .config(routeConfig);

    account.controller('tree',function($scope, zdsSocket, toastr, $uibModal){

    });



    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('accounting.accounts', {
                url: '/accounts',
                templateUrl: 'app/pages/accounting/accounts/accounts.html',
                title: 'حساب ها',
                sidebarMeta: {
                    order: 800
                }
            });
    }

})();
