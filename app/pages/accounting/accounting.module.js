/**
 * Created by asus iran on 8/29/2016.
 */
(function () {
    'use strict';
    angular.module('ZDSGUI.pages.accounting', ['ZDSGUI.pages.accounting.accounts',
        'ZDSGUI.pages.accounting.fiscalyear','ZDSGUI.pages.accounting.category',
        'ZDSGUI.pages.accounting.document'])
        .config(routeConfig);



    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('accounting', {
                url: '/accounting',
                template: '<ui-view></ui-view>',
                abstract: true,
                title: 'حسابداری',
                sidebarMeta: {
                    icon: 'ion-ios-bookmarks',
                    order: 99
                }
            });
    }
})();