/**
 * Created by asus iran on 8/29/2016.
 */
(function () {
    'use strict';

    var groupmng = angular.module('ZDSGUI.pages.user-mng.group-mng', [])
        .config(routeConfig);
    groupmng.controller('group-mng',function ($scope,zdsSocket,toastr,$uibModal) {
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
        $scope.openmodal = function (page, size, id,t,d,pid) {
            $scope.gid = id;
            $scope.title = t;
            $scope.dec = d;
            $scope.pid = pid;
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

    groupmng.controller('newgroup',function ($scope,zdsSocket,$uibModal,toastr) {
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
                if (data["success"] == true) {
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

    groupmng.controller('editgroup',function ($scope,zdsSocket,$uibModal,toastr) {
        $scope.$on('modal.closing', function (event, reason, closed) {
            $scope.getgroups();
        });

        $scope.modifygroup = function () {
            var msg = {
                type: "call",
                node: "userman.updateUsergroup",
                data: {userGroupID:$scope.gid,title: $scope.title,parentID: $scope.pid,description: $scope.dec}
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    toastr.success('اطلاعات با موفقیت اعمال شد!');
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
    groupmng.controller('removegroup',function ($scope,zdsSocket,toastr,$uibModal) {
        $scope.$on('modal.closing', function (event, reason, closed) {
            $scope.getgroups();
        });

        $scope.doremove = function () {
            var msg = {
                type: "call",
                node: "userman.removeUsergroup",
                data: {value:$scope.gid}
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    toastr.success('گروه مورد نظر حذف شد!');
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }
    });

    groupmng.controller('editgroupperm',function ($scope,zdsSocket,$uibModal,toastr,$TreeDnDConvert) {
        var tree;
        $scope.tree_data = {};
        $scope.my_tree = tree = {};

        $scope.my_tree.addFunction = function (node) {
            console.log(node);
            alert('Function added in Controller "App.js"');
        };

        $scope.expanding_property = {
            /*template: "<td>OK All</td>",*/
            field: 'Name',
            titleClass:  'text-center',
            cellClass:   'v-middle',
            displayName: 'Name'
        };
        $scope.col_defs = [
            {
                field: 'Description'
            }, {
                field:        'Description',
                titleStyle:   {
                    'width': '80pt'
                },
                titleClass:   'text-center',
                cellClass:    'v-middle text-center',
                displayName:  'Description',
                cellTemplate: '<i class="fa {{ !node.Description ? \'fa-times text-danger-lter\' : \'fa-check text-success\' }} text"></i>'
            }, {
                displayName:  'Function',
                cellTemplate: '<button ng-click="tree.addFunction(node)" class="btn btn-default btn-sm">Added Controller!</button>'
            }, {
                displayName:  'Remove',
                cellTemplate: '<button ng-click="tree.remove_node(node)" class="btn btn-default btn-sm">Remove</button>'
            }];
        // DataDemo.getDatas() can see in 'Custom Option' -> Tab 'Data Demo'
        $scope.tree_data = [{"id":"0","parent":"#","text":"","state":{"opened":true}},{"id":"14","parent":"0","text":"گروه تست","state":{"opened":true}},{"id":"20","parent":"0","text":"گروه تست 2","state":{"opened":true}},{"id":"23","parent":"14","text":"معین 3","state":{"opened":true}},{"id":"31","parent":"14","text":"معین 11","state":{"opened":true}},{"id":"34","parent":"20","text":"معین تفضیلی 1","state":{"opened":true}},{"id":"35","parent":"20","text":"گروه تستی 33","state":{"opened":true}},{"id":"37","parent":"20","text":"گروه تستی 66","state":{"opened":true}},{"id":"39","parent":"0","text":"asdasd","state":{"opened":true}},{"id":"42","parent":"35","text":"نتهعان","state":{"opened":true}},{"id":"43","parent":"35","text":"alibaba","state":{"opened":true}},{"id":"44","parent":"35","text":"ali","state":{"opened":true}}];



        $scope.getperm = function () {
            var msg = {
                type: "call",
                node: "userman.listUsergroupPermissions",
                data: {value: $scope.gid}
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    //$scope.models.lists.yes = data['data']['listPermissions'];
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }

        $scope.getperm();

    });
    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('user-mng.group-mng', {
                url: '/group-mng',
                templateUrl : 'app/pages/user-mng/group-mng/group-mng.html',
                title: 'گروه ها',
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
