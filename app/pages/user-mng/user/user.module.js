/**
 * Created by asus iran on 8/29/2016.
 */
(function () {
    'use strict';

    var user = angular.module('ZDSGUI.pages.user-mng.user', ['ZDSGUI.pages.ui.notifications'])
        .config(routeConfig);
    user.controller('useraction', function ($scope, zdsSocket, toastr) {

        //$scope.gridOptions = { data: 'myData' };

        $scope.getlistuser = function () {
            var msg = {
                type: "call",
                node: "userman.listUsers",
                id: "1234568"
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {

                        $scope.result = "True";
                        $scope.myData = data['data']['userList'];
                    } else {
                        toastr.error('!', 'خطا!');
                        
                        //$scope.LoginDisabled = false;

                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
            //console.log("Hello! " + $scope.username)

        };
        $scope.doremove = function (id) {
            //var rnd = Math.round(Math.random() * 1000000000);
            var msg = {
                type: "call",
                node: "userman.removeUser",
                data:{value: id}
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('کاربر با موفقیت حذف شد!');
                        $scope.getlistuser();
                    } else {
                        toastr.error('!', 'خطا!');

                        //$scope.LoginDisabled = false;

                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
        }

        $scope.doedit = function () {
            var msg = {
                type: "call",
                node: "userman.modifyUser",
                data:{username: $scope.username,password: $scope.pwd,name: $scope.name}
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('اطلاعات با موفقیت اعمال شد');
                        $scope.getlistuser();
                    } else {
                        toastr.error('!', 'خطا!');

                        //$scope.LoginDisabled = false;

                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
        }

        $scope.adduser = function () {

            var msg = {
                type: "call",
                node: "userman.addUser",
                data:{username: $scope.username,password: $scope.pwd,name: $scope.name}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('کاربر با موفقیت اضافه شد!');
                        $scope.getlistuser();
                    } else {
                        toastr.error('!', 'خطا!');

                        //$scope.LoginDisabled = false;

                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
        }

        $scope.getlistuser();
    });


   angular.module('ZDSGUI.pages.ui.notifications');
    usermodal.controller('ModalsPageCtrl', ModalsPageCtrl);
    /** @ngInject */
    function ModalsPageCtrl($scope, $uibModal) {
        $scope.open = function (page, size) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };
    }

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