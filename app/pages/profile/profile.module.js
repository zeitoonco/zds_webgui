/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('ZDSGUI.pages.profile', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('profile', {
          url: '/profile',
          title: 'پروفایل',
          templateUrl: 'app/pages/profile/profile.html',
          controller: 'ProfilePageCtrl',
        });
  }

})();
