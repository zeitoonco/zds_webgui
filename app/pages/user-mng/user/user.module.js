/**
 * Created by asus iran on 8/29/2016.
 */
(function () {
    'use strict';

    angular.module('ZDSGUI.pages.user-mng.user', [])
        .config(routeConfig);


    function routeConfig($stateProvider) {
        $stateProvider
            .state('user', {
                url: '/user',
                templateUrl: 'app/pages/user-mng/user/user.html',
                title: 'Users',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 3,
                },
            });
    }

})();