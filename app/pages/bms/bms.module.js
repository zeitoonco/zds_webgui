(function () {
    'use strict';
    angular.module('ZDSGUI.pages.bms', ['ZDSGUI.pages.bms.list'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('bms', {
                url: '/bms',
                template: '<ui-view></ui-view>',
                permission: 'AccountingRelay',
                abstract: true,
                title: 'مدیریت ساختمان',
                sidebarMeta: {
                    icon: 'ion-ios-home',
                    order: 4
                }
            });
    }
})();