/**
 * Created by asus iran on 8/29/2016.
 */
(function () {
    'use strict';

    var groupmng = angular.module('ZDSGUI.pages.user-mng.group-mng', [])
        .config(routeConfig);
    groupmng.controller('group-mng',function ($scope,zdsSocket,$uibModal) {
        $scope.getgroups = function () {
            var msg = {
                type: "call",
                node: "userman.listUsergroups"
            };
            zdsSocket.send(msg, function (data) {
                console.log(JSON.stringify(data));
                if (data["success"] == true) {
                    $scope.myData = data['data']['userGroupsList'];
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }
        $scope.openmodal = function (page, size, id,t,d) {
            $scope.id = id;
            $scope.title = t;
            $scope.dec = d;
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

        $scope.getgroups();

    });

    groupmng.controller('newgroup',function ($scope,zdsSocket,$uibModal) {
        $scope.$on('modal.closing', function (event, reason, closed) {
            $scope.getgroups();
        });
        $scope.grouplist = [];


        $scope.addgroup = function () {
            var msg = {
                type: "call",
                node: "userman.registerUsergroup",
                data: {title: $scope.title,parentID: $scope.pid,description: $scope.dec}
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                console.log(JSON.stringify(data));
                if (data["data"]["result"] == true) {
                    toastr.success('گروه اضافه شد!');
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }

        $scope.getgroup = function (){
            var msg = {
                type: "call",
                node: "userman.listUsergroups"
            };
            zdsSocket.send(msg, function (data) {
                console.log(JSON.stringify(data));
                if (data["success"] == true) {
                    $scope.grouplist = data['data']['userGroupsList'];
                    $scope.grouplist.push({"usergroupID":-1,"title":"سرشاخه","parentID":-1,"description":"test1"});
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }

        $scope.getgroup();
    });

    groupmng.controller('editgroup',function ($scope,zdsSocket,$uibModal) {
        $scope.$on('modal.closing', function (event, reason, closed) {
            $scope.getgroups();
        });

        $scope.modifygroup = function () {
            var msg = {
                type: "call",
                node: "userman.updateUsergroup",
                data: {GroupID:$scope.gid,title: $scope.title,parentID: $scope.pid,description: $scope.dec}
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["data"]["result"] == true) {
                    toastr.success('اطلاعات با موفقیت اعمال شد!');
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }
    });


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('user-mng.group-mng', {
                url: '/group-mng',
                templateUrl : 'app/pages/user-mng/group-mng/group-mng.html',
                title: 'دسته بندی کاربران',
                permission: 'userman.groupmng',
                sidebarMeta: {
                    icon: 'ion-person-stalker',
                    order: 2,
                },
            });
    }

})();
/**
 * Created by asus iran on 10/17/2016.
 */
