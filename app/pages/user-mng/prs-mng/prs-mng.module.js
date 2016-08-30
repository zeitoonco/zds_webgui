/**
 * Created by asus iran on 8/29/2016.
 */
(function () {
    'use strict';

    angular.module('ZDSGUI.pages.user-mng.prs-mng', [])
        .config(routeConfig);


    function routeConfig($stateProvider) {
        $stateProvider
            .state('user-mng.prs-mng', {
                url: '/prs-mng',
                templateUrl: 'app/pages/user-mng/prs-mng/prs-mng.html',
                title: 'دسترسی ها',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 4,
                },
            });
    }

})();