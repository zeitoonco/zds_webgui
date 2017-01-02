'use strict';

angular.module('ZDSGUI', [
    'angular-loading-bar',
    'ngAnimate',
    'ui.bootstrap',
    'ui.sortable',
    'ui.router',
    'ngTouch',
    'toastr',
    'ngWebSocket',
    'ZDSGUI.websocket',
    'smart-table',
    "xeditable",
    'ui.slimscroll',
    'ngJsTree',

    'angular-progress-button-styles',

    'ZDSGUI.zdsperm',
    'ZDSGUI.boolean',
    'ZDSGUI.theme',
    'ZDSGUI.pages',
    'ngJalaliFlatDatepicker',
    'ntt.TreeDnD',
    'wo.7segments',
    'ZDSGUI.elements',
]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 0;
}]);