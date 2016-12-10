'use strict';

angular.module('ZDSGUI', [
    'angular-loading-bar',
    'ngAnimate',
    'ui.bootstrap',
    'ui.sortable',
    'ui.router',
    'ngTouch',
    'toastr',
    'smart-table',
    "xeditable",
    'ui.slimscroll',
    'ngJsTree',
    'ngWebSocket',
    'angular-progress-button-styles',
    'ZDSGUI.websocket',
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