/**
 * Created by Pedram2 on 8/30/2016.
 */

/**
 * @author v.lugovsky
 * created on 21.12.2015
 */
(function () {
    'use strict';

 var account = angular.module('ZDSGUI.pages.accounting.accounts', [
        'ZDSGUI.pages.accounting.accounts.accountree','ZDSGUI.pages.accounting.accounts.accounttable','ZDSGUI.pages.components.tree','ZDSGUI.boolean'])
        .config(routeConfig);


    account.controller('accounttable',function($scope, zdsSocket, toastr, $uibModal){

        $scope.getaccounts = function () {
            var msg = {
                type:"call",
                node:"AccountingRelay.query",
                data:{'table': 'Account','columns':['accountid','type','title2','HasDL','HasCurrency','HasTracking','IsActive']}
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        $scope.myData = data.data.result.rows;
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }

        }

        $scope.getaccounts();


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
