/**
 * Created by asus iran on 8/29/2016.
 */
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


    var groupmng = angular.module('ZDSGUI.pages.user-mng.group-mng', ['nzToggle', 'treeGrid'])
        .config(routeConfig);
    groupmng.controller('group-mng', function ($scope, zdsSocket, toastr, $uibModal) {
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
        $scope.openmodal = function (page, size, id, t, d, pid) {
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

    groupmng.controller('newgroup', function ($scope, zdsSocket, $uibModal, toastr) {
        $scope.$on('modal.closing', function (event, reason, closed) {
            $scope.getgroups();
        });
        $scope.grouplist = [];


        $scope.addgroup = function () {
            var msg = {
                type: "call",
                node: "userman.registerUsergroup",
                data: {title: $scope.title, parentID: $scope.pid, description: $scope.dec}
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

        $scope.getgroup = function () {
            var msg = {
                type: "call",
                node: "userman.listUsergroups"
            };
            zdsSocket.send(msg, function (data) {
                console.log(JSON.stringify(data));
                if (data["success"] == true) {
                    $scope.grouplist = data['data']['userGroupsList'];
                    $scope.grouplist.push({
                        "usergroupID": -1,
                        "title": "سرشاخه",
                        "parentID": -1,
                        "description": "test1"
                    });
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }

        $scope.getgroup();
    });

    groupmng.controller('editgroup', function ($scope, zdsSocket, $uibModal, toastr) {
        $scope.$on('modal.closing', function (event, reason, closed) {
            $scope.getgroups();
        });

        $scope.modifygroup = function () {
            var msg = {
                type: "call",
                node: "userman.updateUsergroup",
                data: {userGroupID: $scope.gid, title: $scope.title, parentID: $scope.pid, description: $scope.dec}
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
        $scope.getgroup = function () {
            var msg = {
                type: "call",
                node: "userman.listUsergroups"
            };
            zdsSocket.send(msg, function (data) {
                console.log(JSON.stringify(data));
                if (data["success"] == true) {
                    $scope.grouplist = data['data']['userGroupsList'];
                    $scope.grouplist.push({
                        "usergroupID": -1,
                        "title": "سرشاخه",
                        "parentID": -1,
                        "description": "test1"
                    });
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }

        $scope.getgroup();
    });
    groupmng.controller('removegroup', function ($scope, zdsSocket, toastr, $uibModal) {
        $scope.$on('modal.closing', function (event, reason, closed) {
            $scope.getgroups();
        });

        $scope.doremove = function () {
            var msg = {
                type: "call",
                node: "userman.removeUsergroup",
                data: {value: $scope.gid}
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

    groupmng.controller('editgroupperm', function ($scope, zdsSocket, $uibModal, toastr, $TreeDnDConvert) {
        $scope.treeperms = []; //voucher items
        $scope.treeperm = [{
            "id": 0,
            "name": "_masterPermission",
            "state": "true",
            "children": [{
                "id": 1,
                "name": "_core",
                "state": "true",
                "children": [{
                    "id": 2,
                    "name": "_core.commands",
                    "state": "true",
                    "children": [{"id": 4, "name": "_core.registerCommand", "state": "true", "children": []}, {
                        "id": 5,
                        "name": "_core.removeCommand",
                        "state": "true",
                        "children": []
                    }, {"id": 6, "name": "_core.registerEvent", "state": "true", "children": []}, {
                        "id": 7,
                        "name": "_core.removeEvent",
                        "state": "true",
                        "children": []
                    }, {"id": 8, "name": "_core.registerHook", "state": "true", "children": []}, {
                        "id": 9,
                        "name": "_core.removeHook",
                        "state": "true",
                        "children": []
                    }, {"id": 10, "name": "error", "state": "true", "children": []}, {
                        "id": 11,
                        "name": "warning",
                        "state": "true",
                        "children": []
                    }, {"id": 12, "name": "_core.registerSetting", "state": "true", "children": []}, {
                        "id": 13,
                        "name": "_core.removeSetting",
                        "state": "true",
                        "children": []
                    }, {"id": 14, "name": "_core.setSetting", "state": "true", "children": []}, {
                        "id": 15,
                        "name": "_core.getSetting",
                        "state": "true",
                        "children": []
                    }, {"id": 16, "name": "_core.updateSetting", "state": "true", "children": []}, {
                        "id": 17,
                        "name": "_core.resetSetting",
                        "state": "true",
                        "children": []
                    }, {"id": 18, "name": "_core.getListOfServices", "state": "true", "children": []}, {
                        "id": 19,
                        "name": "_core.getServiceInfo",
                        "state": "true",
                        "children": []
                    }, {"id": 20, "name": "_core.installService", "state": "true", "children": []}, {
                        "id": 21,
                        "name": "_core.uninstallService",
                        "state": "true",
                        "children": []
                    }, {"id": 22, "name": "_core.enableService", "state": "true", "children": []}, {
                        "id": 23,
                        "name": "_core.disableService",
                        "state": "true",
                        "children": []
                    }, {"id": 24, "name": "_core.kickService", "state": "true", "children": []}, {
                        "id": 25,
                        "name": "_core.pingService",
                        "state": "true",
                        "children": []
                    }]
                }, {
                    "id": 3,
                    "name": "_core.events",
                    "state": "true",
                    "children": [{
                        "id": 26,
                        "name": "_core.onSettingUpdate",
                        "state": "true",
                        "children": []
                    }, {"id": 27, "name": "_core.onServiceConnect", "state": "true", "children": []}, {
                        "id": 28,
                        "name": "_core.onServiceDisconnect",
                        "state": "true",
                        "children": []
                    }, {"id": 29, "name": "_core.onServiceEnable", "state": "true", "children": []}, {
                        "id": 30,
                        "name": "_core.onServiceDisable",
                        "state": "true",
                        "children": []
                    }, {"id": 31, "name": "_core.onServiceInstall", "state": "true", "children": []}, {
                        "id": 32,
                        "name": "_core.onServiceUninstall",
                        "state": "true",
                        "children": []
                    }]
                }]
            }, {
                "id": 33,
                "name": "PGDatabase",
                "state": "true",
                "children": [{
                    "id": 34,
                    "name": "PGDatabase.commands",
                    "state": "true",
                    "children": [{"id": 36, "name": "database.query", "state": "true", "children": []}, {
                        "id": 37,
                        "name": "database.execute",
                        "state": "true",
                        "children": []
                    }, {"id": 38, "name": "database.singlefieldquery", "state": "true", "children": []}]
                }, {
                    "id": 35,
                    "name": "PGDatabase.events",
                    "state": "true",
                    "children": [{"id": 39, "name": "database.newUser", "state": "true", "children": []}, {
                        "id": 40,
                        "name": "database.userLogin",
                        "state": "true",
                        "children": []
                    }]
                }]
            }, {
                "id": 41,
                "name": "GUI",
                "state": "true",
                "children": [{"id": 42, "name": "GUI.commands", "state": "true", "children": []}, {
                    "id": 43,
                    "name": "GUI.events",
                    "state": "true",
                    "children": []
                }]
            }, {
                "id": 44,
                "name": "AccountingRelay",
                "state": "true",
                "children": [{
                    "id": 45,
                    "name": "AccountingRelay.commands",
                    "state": "true",
                    "children": [{
                        "id": 47,
                        "name": "AccountingRelay.getConfig",
                        "state": "true",
                        "children": []
                    }, {"id": 48, "name": "AccountingRelay.setConfig", "state": "true", "children": []}, {
                        "id": 49,
                        "name": "AccountingRelay.newFiscalYear",
                        "state": "true",
                        "children": []
                    }, {
                        "id": 50,
                        "name": "AccountingRelay.modifyFiscalYear",
                        "state": "true",
                        "children": []
                    }, {
                        "id": 51,
                        "name": "AccountingRelay.closeFiscalYear",
                        "state": "true",
                        "children": []
                    }, {
                        "id": 52,
                        "name": "AccountingRelay.removeFiscalYear",
                        "state": "true",
                        "children": []
                    }, {"id": 53, "name": "AccountingRelay.newAccount", "state": "true", "children": []}, {
                        "id": 54,
                        "name": "AccountingRelay.modifyAccount",
                        "state": "true",
                        "children": []
                    }, {"id": 55, "name": "AccountingRelay.removeAccount", "state": "true", "children": []}, {
                        "id": 57,
                        "name": "AccountingRelay.modifyDL",
                        "state": "true",
                        "children": []
                    }, {"id": 58, "name": "AccountingRelay.removeDL", "state": "true", "children": []}, {
                        "id": 59,
                        "name": "AccountingRelay.activeDL",
                        "state": "true",
                        "children": []
                    }, {"id": 60, "name": "AccountingRelay.deactiveDL", "state": "true", "children": []}, {
                        "id": 61,
                        "name": "AccountingRelay.newCategory",
                        "state": "true",
                        "children": []
                    }, {
                        "id": 165,
                        "name": "AccountingRelay.createNewVocher",
                        "state": "true",
                        "children": []
                    }, {
                        "id": 166,
                        "name": "AccountingRelay.modifyNewVocher",
                        "state": "true",
                        "children": []
                    }, {"id": 167, "name": "AccountingRelay.newDL", "state": "true", "children": []}, {
                        "id": 169,
                        "name": "AccountingRelay.accountlist",
                        "state": "true",
                        "children": []
                    }]
                }, {"id": 46, "name": "AccountingRelay.events", "state": "true", "children": []}]
            }, {
                "id": 112,
                "name": "UserManagement",
                "state": "true",
                "children": [{
                    "id": 113,
                    "name": "UserManagement.commands",
                    "state": "true",
                    "children": [{"id": 115, "name": "userman.login", "state": "true", "children": []}, {
                        "id": 116,
                        "name": "userman.logout",
                        "state": "true",
                        "children": []
                    }, {"id": 117, "name": "userman.checkPermission", "state": "true", "children": []}, {
                        "id": 118,
                        "name": "userman.checkPermissionByName",
                        "state": "true",
                        "children": []
                    }, {"id": 119, "name": "userman.addUser", "state": "true", "children": []}, {
                        "id": 120,
                        "name": "userman.modifyUser",
                        "state": "true",
                        "children": []
                    }, {"id": 121, "name": "userman.removeUser", "state": "true", "children": []}, {
                        "id": 122,
                        "name": "userman.getUserInfo",
                        "state": "true",
                        "children": []
                    }, {"id": 123, "name": "userman.registerPermission", "state": "true", "children": []}, {
                        "id": 124,
                        "name": "userman.updatePermission",
                        "state": "true",
                        "children": []
                    }, {"id": 125, "name": "userman.removePermission", "state": "true", "children": []}, {
                        "id": 126,
                        "name": "userman.registerUsergroup",
                        "state": "true",
                        "children": []
                    }, {"id": 127, "name": "userman.updateUsergroup", "state": "true", "children": []}, {
                        "id": 128,
                        "name": "userman.removeUsergroup",
                        "state": "true",
                        "children": []
                    }, {"id": 129, "name": "userman.listUsers", "state": "true", "children": []}, {
                        "id": 130,
                        "name": "userman.listUsersByGroup",
                        "state": "true",
                        "children": []
                    }, {"id": 131, "name": "userman.listPermissions", "state": "true", "children": []}, {
                        "id": 132,
                        "name": "userman.listUsergroups",
                        "state": "true",
                        "children": []
                    }, {"id": 133, "name": "userman.addUserUsergroup", "state": "true", "children": []}, {
                        "id": 134,
                        "name": "userman.removeUserUsergroup",
                        "state": "true",
                        "children": []
                    }, {"id": 135, "name": "userman.addUserPermission", "state": "true", "children": []}, {
                        "id": 136,
                        "name": "userman.removeUserPermission",
                        "state": "true",
                        "children": []
                    }, {"id": 137, "name": "userman.listUserPermissions", "state": "true", "children": []}, {
                        "id": 138,
                        "name": "userman.addUsergroupPermission",
                        "state": "true",
                        "children": []
                    }, {
                        "id": 139,
                        "name": "userman.removeUsergroupPermission",
                        "state": "true",
                        "children": []
                    }, {
                        "id": 140,
                        "name": "userman.listUsergroupPermissions",
                        "state": "true",
                        "children": []
                    }, {"id": 141, "name": "userman.addContact", "state": "true", "children": []}, {
                        "id": 142,
                        "name": "userman.modifyContact",
                        "state": "true",
                        "children": []
                    }, {"id": 143, "name": "userman.removeContact", "state": "true", "children": []}, {
                        "id": 144,
                        "name": "userman.listContacts",
                        "state": "true",
                        "children": []
                    }, {"id": 145, "name": "userman.setUserAvatar", "state": "true", "children": []}, {
                        "id": 146,
                        "name": "userman.getUserAvatar",
                        "state": "true",
                        "children": []
                    }, {"id": 147, "name": "userman.listGroups", "state": "true", "children": []}, {
                        "id": 168,
                        "name": "userman.userlist",
                        "state": "true",
                        "children": []
                    }, {"id": 170, "name": "userman.groupmng", "state": "true", "children": []}]
                }, {
                    "id": 114,
                    "name": "UserManagement.events",
                    "state": "true",
                    "children": [{"id": 148, "name": "userman.loggedIn", "state": "true", "children": []}, {
                        "id": 149,
                        "name": "userman.loggedOut",
                        "state": "true",
                        "children": []
                    }, {"id": 150, "name": "userman.userAdded", "state": "true", "children": []}, {
                        "id": 151,
                        "name": "userman.userModified",
                        "state": "true",
                        "children": []
                    }, {"id": 152, "name": "userman.userRemoved", "state": "true", "children": []}, {
                        "id": 153,
                        "name": "userman.permissionAdded",
                        "state": "true",
                        "children": []
                    }, {"id": 154, "name": "userman.permissionModified", "state": "true", "children": []}, {
                        "id": 155,
                        "name": "userman.permissionRemoved",
                        "state": "true",
                        "children": []
                    }, {"id": 156, "name": "userman.usergroupAdded", "state": "true", "children": []}, {
                        "id": 157,
                        "name": "userman.usergroupModified",
                        "state": "true",
                        "children": []
                    }, {"id": 158, "name": "userman.usergroupRemoved", "state": "true", "children": []}, {
                        "id": 159,
                        "name": "userman.usersUsergroupRemoved",
                        "state": "true",
                        "children": []
                    }, {"id": 160, "name": "userman.usersUsergroupAdded", "state": "true", "children": []}, {
                        "id": 161,
                        "name": "userman.usersPermissionRemoved",
                        "state": "true",
                        "children": []
                    }, {"id": 162, "name": "userman.usersPermissionAdded", "state": "true", "children": []}, {
                        "id": 163,
                        "name": "userman.usergroupPermissionAdded",
                        "state": "true",
                        "children": []
                    }, {"id": 164, "name": "userman.usergroupPermissionRemoved", "state": "true", "children": []}]
                }]
            }]
        }];
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
                node: "userman.addUsergroupPermission",
                data: {groupid: $scope.gid, permissions: temp}
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {

            });

        }

        $scope.getperm = function () {
            var msg = {
                type: "call",
                node: "userman.listUsergroupPermissions",
                data: {value: $scope.gid}
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
    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('user-mng.group-mng', {
                url: '/group-mng',
                templateUrl: 'app/pages/user-mng/group-mng/group-mng.html',
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
