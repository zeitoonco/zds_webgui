/**
 * Created by asus iran on 8/29/2016.
 */
(function () {
    'use strict';

    var core = angular.module('ZDSGUI.pages.core', [])
        .config(routeConfig);

    core.controller('core', function ($scope,zdsSocket,$uibModal,toastr) {
        $scope.openmodal = function (page, size, name) {
            $scope.sname = name;
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
        $scope.getservices = function () {
            var msg = {
                node:"_core.getListOfServices",
                type:"call"
            }
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    $scope.myData = data['data']['extensions'];
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }
        $scope.getservices();
    });

    core.controller('enable', function ($scope,zdsSocket,$uibModal,toastr) {
        $scope.$on('modal.closing', function (event, reason, closed) {
            $scope.getservices();
        });
        $scope.enableservices = function () {
            var msg = {
                node:"_core.enableService",
                type:"call",
                data:{name:$scope.sname}
            }
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    toastr.success('عملیات موفقیت آمیز بود!');
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }
    });

    core.controller('disable', function ($scope,zdsSocket,$uibModal,toastr) {
        $scope.$on('modal.closing', function (event, reason, closed) {
            $scope.getservices();
        });
        $scope.disableservices = function () {
            var msg = {
                node:"_core.disableService",
                type:"call",
                data:{name:$scope.sname}
            }
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    toastr.success('عملیات موفقیت آمیز بود!');
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }
    });
    core.controller('kick', function ($scope,zdsSocket,$uibModal,toastr) {
        $scope.$on('modal.closing', function (event, reason, closed) {
            $scope.getservices();
        });
        $scope.kickservices = function () {
            var msg = {
                node:"_core.kickService",
                type:"call",
                data:{name:$scope.sname}
            }
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    toastr.success('عملیات موفقیت آمیز بود!');
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }
    });
    core.controller('ping', function ($scope,zdsSocket,$uibModal,toastr) {
        $scope.$on('modal.closing', function (event, reason, closed) {
            $scope.getservices();
        });
        $scope.pingservices = function () {
            var msg = {
                node:"_core.pingService",
                type:"call",
                data:{name:$scope.sname}
            }
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    toastr.success('عملیات موفقیت آمیز بود!');

                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }
        $scope.pingservices();
    });

    function routeConfig($stateProvider) {
        $stateProvider
            .state('core', {
                url: '/core',
                templateUrl: 'app/pages/core/core.html',
                title: 'هسته',
                permission: '_core',
                sidebarMeta: {
                    icon: 'ion-planet',
                    order: 5,
                },
            });
    }

})();