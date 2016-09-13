/**
 * Created by asus iran on 9/13/2016.
 */
(function () {
    'use strict';
angular.module('ZDSGUI.pages.accounting.accounts.accountree',['ZDSGUI.pages.components.tree','ZDSGUI.boolean'])
    .config(routeConfig);

    accounttree.controller('accounttree', function ($scope, zdsSocket, toastr, $uibModal) {

});

function routeConfig($stateProvider) {
    $stateProvider
        .state('accounting.accounts.accounttree', {
            url: '/accounttree',
            templateUrl: 'app/pages/accounting/accounts/accounttree/accounttree.html',
            title: 'درختواره',
            sidebarMeta: {
                order: 800
            }
        });
}

})();