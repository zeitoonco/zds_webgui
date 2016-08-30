/**
 * Created by asus iran on 8/29/2016.
 */
(function () {
    'use strict';

    angular.module('ZDSGUI.pages.user-mng', [
        'ZDSGUI.pages.user-mng.prs-mng',
        'ZDSGUI.pages.user-mng.user',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('user-mng', {
                url: '/user-mng',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: 'مدیریت کاربران',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 100,
                },
            });
    }

})();