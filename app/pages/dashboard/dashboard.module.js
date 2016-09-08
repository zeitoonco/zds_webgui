/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

   var dash = angular.module('ZDSGUI.pages.dashboard', []).config(routeConfig);

    dash.controller('contact',function ($scope,zdsSocket, toastr, $uibModal) {
    function listcontact() {
        var msg = {
            type: "call",
            node: "userman.listContacts",
            id: "1234568",
            data: {value: uid}
        };
        if (zdsSocket.status() == 1) {
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    toastr.success('لیست مخاطبین شما دریافت شد!');
                    var myData = data["data"]["contactList"];
                } else {
                    toastr.error('!', 'خطا!');

                    //$scope.LoginDisabled = false;

                }
            });
        } else {
            toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

        }
    }
        listcontact();
    });

    dash.controller('group',function ($scope,zdsSocket, toastr, $uibModal) {
        function listgroup() {
            var msg = {
                type: "call",
                node: "userman.listGroups",
                id: "1234568",
                data: {value: uid}
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('لیست گروه های شما دریافت شد!');
                        var myData = data["data"]["groupList"];
                    } else {
                        toastr.error('!', 'خطا!');

                        //$scope.LoginDisabled = false;

                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
        }
        listgroup();

    });



  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'app/pages/dashboard/dashboard.html',
          title: 'داشبورد',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        });
  }

})();
