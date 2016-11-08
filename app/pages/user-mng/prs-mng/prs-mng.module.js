/**
 * Created by asus iran on 8/29/2016.
 */
var editid;
(function () {
    'use strict';
    var prs = angular.module('ZDSGUI.pages.user-mng.prs-mng', [])
        .config(routeConfig);
    prs.controller('prsaction', function ($scope, zdsSocket, toastr, $uibModal) {

        //$scope.gridOptions = { data: 'myData' };

        $scope.getlistprs = function () {
            var msg = {
                type: "call",
                node: "userman.listPermissions",
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {

                        $scope.myData = data['data']['listPermissions'];
                        $scope.totalItems = $scope.myData.length;
                        $scope.currentPage = 1;
                        $scope.numPerPage = 10;
                        $scope.paginate = function(value) {
                            var begin, end, index;
                            begin = ($scope.currentPage - 1) * $scope.numPerPage;
                            end = begin + $scope.numPerPage;
                            index = $scope.myData.indexOf(value);
                            return (begin <= index && index < end);
                        };
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
        $scope.itemsByPage = 15;
        $scope.doremove = function (id) {
            //var rnd = Math.round(Math.random() * 1000000000);
            var msg = {
                type: "call",
                node: "userman.removePermission",
                data: {value: id}
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('دسترسی با موفقیت حذف شد!');
                        $scope.getlistprs();
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
                node: "userman.updatePermission",
                data: {
                    permissionID: $scope.id,
                    name: $scope.pname,
                    title: $scope.ptitle,
                    description: $scope.pdec,
                    parentID: $scope.pid
                }
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('اطلاعات با موفقیت اعمال شد');
                        $scope.getlistprs();
                    } else {
                        toastr.error('!', 'خطا!');

                        //$scope.LoginDisabled = false;

                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
        }

        $scope.addprs = function () {

            var msg = {
                type: "call",
                node: "userman.registerPermission",
                data: {name: $scope.pname, title: $scope.ptitle, description: $scope.pdec, parentID: $scope.pid}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('دسترسی با موفقیت اضافه شد!');

                    } else {
                        toastr.error('!', 'خطا!');

                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
        }

        $scope.getlistprs();

        $scope.openmodal = function (page, size, id) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                scope: $scope,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        }

    });


    function routeConfig($stateProvider) {
        $stateProvider
            .state('user-mng.prs-mng', {
                url: '/prs-mng',
                templateUrl: 'app/pages/user-mng/prs-mng/prs-mng.html',
                title: 'دسترسی ها',
                permission: 'userman.registerPermission',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 4,
                },
            });
    }

})();