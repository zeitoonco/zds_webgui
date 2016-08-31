/**
 * Created by asus iran on 8/29/2016.
 */
(function () {
    'use strict';

    var user = angular.module('ZDSGUI.pages.user-mng.user', [])
        .config(routeConfig);
    user.controller('useraction', function ($scope, zdsSocket, toastr) {

        //$scope.gridOptions = { data: 'myData' };

        $scope.getlistuser = function () {
            // $scope.LoginDisabled = true;
            $scope.result = 'clicked';
            alert('clicked');
            var msg = {
                type: "call",
                node: "userman.listUsers",
                id: "1234568"
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        alert('ok');
                        $scope.result = "True";
                        $scope.myData = data['data']['userList'];
                    } else {
                        toastr.error('!', 'خطا!');
                        alert('no');
                        //$scope.LoginDisabled = false;

                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
            //console.log("Hello! " + $scope.username)

        };
        // $scope.doremove(i



        $scope.getlistuser();
    });

    function routeConfig($stateProvider) {
        $stateProvider
            .state('user-mng.user', {
                url: '/user',
                templateUrl: 'app/pages/user-mng/user/user.html',
                title: 'کاربران',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 3,
                },
            });
    }

})();