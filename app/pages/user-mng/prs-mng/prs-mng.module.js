/**
 * Created by asus iran on 8/29/2016.
 */
var editid;
(function () {
    'use strict';
    var prs = angular.module('ZDSGUI.pages.user-mng.prs-mng', [])
        .config(routeConfig);
    prs.controller('prsaction', function ($scope, zdsSocket, toastr, $uibModal) {
        $scope.$on('modal.closing', function (event, args) {
            $scope.getlistprs();
        });
        $scope.chechval = function (state) {
            if (state==false){
                return "border-color:#a94442;";
            } else {
                return "border-color:#209e91;";
            }
        }

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

        $scope.getlistprs();

        $scope.openmodal = function (page, size, id,title,name,dec,pid) {
            $scope.id = id;
            $scope.ptitle = title;
            $scope.pname = name;
            $scope.pdec = dec;
            $scope.ppid = pid;
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

    prs.controller('newperm',function(zdsSocket,$scope,toastr){
        $scope.$on('modal.closing', function (event, args) {
            $scope.getlistprs();
        });

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

    });

    prs.controller('editperm',function(zdsSocket,$scope,toastr){
        $scope.$on('modal.closing', function (event, args) {
            $scope.getlistprs();
        });
        $scope.doedit = function () {
            var msg = {
                type: "call",
                node: "userman.updatePermission",
                data: {
                    permissionID: $scope.id,
                    name: $scope.pname,
                    title: $scope.ptitle,
                    description: $scope.pdec,
                    parentID: $scope.ppid
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

    });

    prs.controller('removeperm',function(zdsSocket,$scope,toastr){
        $scope.$on('modal.closing', function (event, args) {
            $scope.getlistprs();
        });

        $scope.doremove = function () {
            //var rnd = Math.round(Math.random() * 1000000000);
            var msg = {
                type: "call",
                node: "userman.removePermission",
                data: {value: $scope.id}
            };
            console.log(JSON.stringify(msg));
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
    });

    function routeConfig($stateProvider) {
        $stateProvider
            .state('user-mng.prs-mng', {
                url: '/prs-mng',
                templateUrl: 'app/pages/user-mng/prs-mng/prs-mng.html',
                title: 'دسترسی ها',
                permission: 'userman.listPermissions',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 4,
                },
            });
    }

})();