/**
 * Created by asus iran on 8/29/2016.
 */
(function () {
    'use strict';

    var user = angular.module('ZDSGUI.pages.user-mng.user', [])
        .config(routeConfig);
    user.controller('useraction',function ($scope,zdsSocket) {

        $scope.getlistuser = function () {
           // $scope.LoginDisabled = true;

            var msg = {
                type: "call",
                node: "userman.listUsers",
                id: "1234568"
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["data"]["success"] == "true") {
                        $scope.result = "True";

                    } else {
                        toastr.error('!', 'خطا!');
                        //$scope.LoginDisabled = false;

                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
            //console.log("Hello! " + $scope.username)

        }

    });

    function routeConfig($stateProvider) {
        $stateProvider
            .state('user', {
                url: '/user',
                templateUrl: 'app/pages/user-mng/user/user.html',
                title: 'Users',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 3,
                },
            });
    }

})();