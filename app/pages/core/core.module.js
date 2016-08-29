/**
 * Created by asus iran on 8/29/2016.
 */
(function () {
    'use strict';

    angular.module('ZDSGUI.pages.core', [])
        .config(routeConfig);


function routeConfig($stateProvider) {
    $stateProvider
        .state('core', {
            url: '/core',
            templateUrl: 'app/pages/core/core.html',
            title: 'Core',
            sidebarMeta: {
                icon: 'ion-android-home',
                order: 5,
            },
        });
}

})();