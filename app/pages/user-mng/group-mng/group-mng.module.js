/**
 * Created by asus iran on 8/29/2016.
 */
(function () {
    'use strict';

    angular.module('ZDSGUI.pages.user-mng.group-mng', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('user-mng.group-mng', {
                url: '/group-mng',
                templateUrl : 'app/pages/user-mng/group-mng/group-mng.html',
                title: 'دسته بندی کاربران',
                permission: 'userman.groupmng',
                sidebarMeta: {
                    icon: 'ion-person-stalker',
                    order: 2,
                },
            });
    }

})();/**
 * Created by asus iran on 10/17/2016.
 */
