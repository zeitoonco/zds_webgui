/**
 * @author k.danovsky
 * created on 12.01.2016
 */
(function () {
  'use strict';

  angular.module('ZDSGUI.pages.ui', [
    'ZDSGUI.pages.ui.typography',
    'ZDSGUI.pages.ui.buttons',
    'ZDSGUI.pages.ui.icons',
    'ZDSGUI.pages.ui.modals',
    'ZDSGUI.pages.ui.grid',
    'ZDSGUI.pages.ui.alerts',
    'ZDSGUI.pages.ui.progressBars',
    'ZDSGUI.pages.ui.notifications',
    'ZDSGUI.pages.ui.tabs',
    'ZDSGUI.pages.ui.slider',
    'ZDSGUI.pages.ui.panels',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui', {
          url: '/ui',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'UI Features',
          sidebarMeta: {
            icon: 'ion-android-laptop',
            order: 200,
          },
        });
  }

})();
