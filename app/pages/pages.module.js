/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('ZDSGUI.pages', [
        'ui.router',

        'ZDSGUI.pages.dashboard',
        // 'ZDSGUI.pages.ui',
        // 'ZDSGUI.pages.components',
        // 'ZDSGUI.pages.form',
        // 'ZDSGUI.pages.tables',
        // 'ZDSGUI.pages.charts',
        // 'ZDSGUI.pages.maps',
        'ZDSGUI.pages.login',
        'ZDSGUI.pages.profile',
        'ZDSGUI.pages.user-mng',
        'ZDSGUI.pages.core',
        'ZDSGUI.pages.accounting',
        'ZDSGUI.pages.bms',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
        $urlRouterProvider.rule(function ($injector, $location) {
            var rScope = $injector.get('$rootScope');
            var path = $location.path(), normalized = path.toLowerCase();

            if (!rScope.logenin && path.indexOf('login') === -1) {
                $location.path('/login');
            }
        });
        $urlRouterProvider.otherwise('/login');

        // baSidebarServiceProvider.addStaticItem({
        //     title: 'Pages',
        //     icon: 'ion-document',
        //     subMenu: [{
        //         title: 'Sign In',
        //         fixedHref: 'auth.html',
        //         blank: true
        //     }, {
        //         title: 'Sign Up',
        //         fixedHref: 'reg.html',
        //         blank: true
        //     }, {
        //         title: 'User Profile',
        //         stateRef: 'profile'
        //     }, {
        //         title: '404 Page',
        //         fixedHref: '404.html',
        //         blank: true
        //     }]
        // });
        // baSidebarServiceProvider.addStaticItem({
        //     title: 'Menu Level 1',
        //     icon: 'ion-ios-more',
        //     subMenu: [{
        //         title: 'Menu Level 1.1',
        //         disabled: true
        //     }, {
        //         title: 'Menu Level 1.2',
        //         subMenu: [{
        //             title: 'Menu Level 1.2.1',
        //             disabled: true
        //         }]
        //     }]
        // });
    }

})();
