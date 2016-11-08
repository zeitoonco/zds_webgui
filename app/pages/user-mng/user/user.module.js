/**
 * Created by asus iran on 8/29/2016.
 */
var tempname = '', tempun = '', tempid = '';

(function () {
    'use strict';
    function treefy(list){
        var r=list[findID(list,0)];
        var root={id:r.permissionID,name:r.name,state:r.state,children:[]};
        addChilds(list,root);
        return root;
    }

    function findID(l,id) {
        for (var i in l) {
            if (l[i].permissionID==id){
                return i;
            }
        }
        return -1;
    }
    function findPID(l,id) {
        var ch=[];
        for (var i in l) {
            if (l[i].parentID==id){
                ch.push(l[i]);
            }
        }
        return ch;
    }

    function addChilds(l,p) {
        var ch=findPID(l,p.id);
        for (var i in ch){
            var n={id:ch[i].permissionID,name:ch[i].name,state:ch[i].state,children:[]};
            addChilds(l,n);
            p.children.push(n)
        }
    }

    var user = angular.module('ZDSGUI.pages.user-mng.user', ['ZDSGUI.boolean'])
        .config(routeConfig);
        user.controller('useraction', function ($scope, zdsSocket, toastr, $uibModal, $timeout) {
        $scope.username = tempun;
        $scope.name = tempname;
        $scope.id = tempid;
        $scope.getlistuser = function () {
            var msg = {
                type: "call",
                node: "userman.listUsers",
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        $scope.result = "True";
                        $scope.myData = data['data']['userList'];
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
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
            }
        };
        $scope.doremove = function (id) {

            var msg = {
                type: "call",
                node: "userman.removeUser",
                data: {value: id}
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('کاربر با موفقیت حذف شد!');
                        $timeout($scope.getlistuser, 1000);
                    } else {
                        toastr.error('!', 'خطا!');
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
                data: {username: $scope.username, password: $scope.pwd, name: $scope.name}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('کاربر با موفقیت اضافه شد!');
                        $scope.$emit('forceUpdate', false);
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
            }
        }

        $scope.getlistuser();
        $scope.$on('forceUpdate', function (event, args) {
            $scope.getlistuser();
        });
        $scope.openmodal = function (page, size, id, un, n) {
            tempid = id;
            tempun = un;
            tempname = n;
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

    user.controller('usergroup', function ($scope, zdsSocket, toastr) {
        var msg = {
            type: "call",
            node: "userman.listGroups",
            data: {value: tempid}
        };
        if (zdsSocket.status() == 1) {
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {

                if (data["success"] == true && data["data"]["userGroupsList"].length>0) {
                    //toastr.success('گروهی برای این کاربر وجود ندارد');
                    //$scope.getlistuser();
                    $scope.groups = data['data']['userGroupsList'];
                } else {
                    toastr.warning('اطلاعاتی موجود نیست');
                }
            });
        } else {
            toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
        }
    });

    user.controller('modalctrl', function ($scope, zdsSocket, toastr) {
        $scope.username = tempun;
        $scope.name = tempname;
        $scope.id = tempid;
        $scope.doedit = function () {
            var msg = {
                type: "call",
                node: "userman.modifyUser",
                data: {userID: $scope.id, username: $scope.username, password: $scope.pwd, name: $scope.name}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('اطلاعات با موفقیت اعمال شد');
                        $scope.getlistuser();
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
            }
        }
    });
    
    user.controller('edituserperm',function (zdsSocket, $scope, toastr) {
        $scope.treeperms = [];

        $scope.newperms = {};
        $scope.col_defs = [
            {
                field: "id",
                displayName: "کد"
            },
            {
                field: "state",
                displayName: "وضعیت",
                cellTemplate: "<nz-toggle tri-toggle on-toggle=\"cellTemplateScope.click(row.branch[\'state\'],row.branch[\'id\'])\" ng-model='row.branch.state' val-false='-1' val-null='0' val-true='1'>",
                cellTemplateScope: {
                    click: function (data, id) {         // this works too: $scope.someMethod;
                        $scope.newperms[id.toString()] = data;
                        console.log($scope.newperms);
                    }
                }
            }
        ];
        $scope.fetchperms = function () {
            var msg = {
                type: "call",
                node: "userman.listPermissions",
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                $scope.allperms = data['data']['listPermissions'];
                $scope.mergeperms();
                var t = treefy($scope.allperms);
                $scope.treeperms = JSON.parse('[' + JSON.stringify(t) + ']');
                console.log(JSON.stringify($scope.treeperms));
            });
        }
        $scope.addperms = function () {
            var temp = [];
            for (var i in $scope.newperms){
                if ($scope.newperms.hasOwnProperty(i)) {
                    temp.push({id: i, state: $scope.newperms[i]});
                }
            }
            var msg = {
                type: "call",
                node: "userman.addUserPermission",
                data: {id: $scope.gid, permissions: temp}
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {

            });

        }

        $scope.getperm = function () {
            var msg = {
                type: "call",
                node: "userman.listUserPermissions",
                data: {value: tempid}
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    //$scope.matchperm(data['data']['listPermissions']);
                    $scope.myperms = data['data']['listPermissions'];
                    $scope.fetchperms();

                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }

        $scope.mergeperms = function (){
            for (var i = 0; i<$scope.allperms.length; i++){
                $scope.allperms[i]['state'] = '';
                for (var j = 0; j<$scope.myperms.length; j++){
                    if ($scope.allperms[i]['permissionID']==$scope.myperms[j]['id']){
                        $scope.allperms[i]['state'] = $scope.myperms[j]['state'];
                    }
                }
            }
        }
        $scope.getperm();
    });

    var usermodal = angular.module('ZDSGUI.pages.ui.notifications');
    usermodal.controller('ModalsPageCtrl', ModalsPageCtrl);
    /** @ngInject */
    function ModalsPageCtrl($scope, $uibModal) {
        $scope.open = function (page, size, n) {
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
            $scope.name = n;
        };
    }

    function routeConfig($stateProvider) {
        $stateProvider
            .state('user-mng.user', {
                url: '/user',
                templateUrl: 'app/pages/user-mng/user/user.html',
                title: 'کاربران',
                permission: 'userman.userlist',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 3,
                },
            });
    }

})();

