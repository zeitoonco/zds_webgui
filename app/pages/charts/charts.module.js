/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('ZDSGUI.pages.charts', [
      'ZDSGUI.pages.charts.amCharts',
      'ZDSGUI.pages.charts.chartJs',
      'ZDSGUI.pages.charts.chartist',
      'ZDSGUI.pages.charts.morris'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('charts', {
          url: '/charts',
          abstract: true,
          template: '<div ui-view></div>',
          title: 'Charts',
          sidebarMeta: {
            icon: 'ion-stats-bars',
            order: 150,
          },
        });
  }

})();
