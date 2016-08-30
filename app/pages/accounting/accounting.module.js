/**
 * Created by asus iran on 8/29/2016.
 */
(function () {
    'use strict';
    angular.module('ZDSGUI.pages.accounting', [])
        .config(routeConfig);
    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('accounting', {
                url: '/accounting',
                templateUrl: 'app/pages/accounting/accounting.html',
                abstract: true,
                title: 'حسابداری',
                sidebarMeta: {
                    icon: 'ion-ios-bookmarks',
                    order: 200
                }
            });
    }
})();