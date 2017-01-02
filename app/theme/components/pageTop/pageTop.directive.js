/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('ZDSGUI.theme.components')
      .directive('pageTop', pageTop);

  /** @ngInject */
  function pageTop() {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/pageTop/pageTop.html',
      logout: function ($scope,$location, $rootScope, zdsSocket, toastr,baSidebarService,$cookies,$cookieStore) {
        var msg = {
          type: "call",
          node: "userman.logout",
          data: {value: uid}
        };
        if (zdsSocket.status() == 1) {
          $scope.LoginDisabled = true;
          zdsSocket.send(msg, function (data) {
            if (data["data"]["result"] == "ok") {
              $cookieStore.remove("authtoken");
              $cookieStore.remove("userid");
              $rootScope.$logedin = false;
              $location.path("/login");

            } else {
              toastr.error('خطایی رخ داده است!', 'خطا!');


            }
          });
        } else {
          toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
        }
      }
    };
  }

})();