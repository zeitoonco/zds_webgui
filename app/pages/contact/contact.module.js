/**
 * Created by asus iran on 8/29/2016.
 */
(function () {
    'use strict';

    angular.module('ZDSGUI.pages.contact', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('contact', {
                url: '/contact',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: 'مخاطبین',
                sidebarMeta: {
                    icon: 'ion-person-stalker',
                    order: 100,
                },
            });
    }

})();