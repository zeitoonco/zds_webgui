/**
 * Created by asus iran on 9/13/2016.
 */
(function () {
    'use strict';
    angular.module('ZDSGUI.pages.accounting.accounts.accounttable',['ZDSGUI.pages.components.tree','ZDSGUI.boolean'])
    .config(routeConfig);

accounttree.controller('accounttable', function ($scope, zdsSocket, toastr, $uibModal) {

});

function routeConfig($stateProvider) {
    $stateProvider
        .state('accounting.accounts.accounttable', {
            url: '/accounttable',
            templateUrl: 'app/pages/accounting/accounts/accounttree/accounttable.html',
            title: 'لیست',
            sidebarMeta: {
                order: 100
            }
        });
}

})();