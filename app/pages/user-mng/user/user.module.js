/**
 * Created by asus iran on 8/29/2016.
 */
(function () {
    'use strict';
    function treefy2(list){
        var r=list[findID2(list,1)];
        var root={usergroupID:r.usergroupID,title:r.title,state:r.state,parentID:r.parentID,description:r.description,children:[]};
        addChilds2(list,root);
        return root;
    }

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
    function findID2(l,id) {
        for (var i in l) {
            if (l[i].usergroupID==id){
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
    function findPID2(l,id) {
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
    function addChilds2(l,p) {
        var ch=findPID2(l,p.usergroupID);
        for (var i in ch){
            var n={usergroupID:ch[i].usergroupID,title:ch[i].title,state:ch[i].state,parentID:ch[i].parentID,description:ch[i].description,children:[]};
            addChilds2(l,n);
            p.children.push(n)
        }
    }

    var user = angular.module('ZDSGUI.pages.user-mng.user', ['ZDSGUI.boolean'])
        .config(routeConfig);
        user.controller('useraction', function ($scope, zdsSocket, toastr, $uibModal) {
            $scope.$on('modal.closing', function (event, args) {
                $scope.getlistuser();
            });

            $scope.chechval = function (state) {
                if (state==false){
                    return "border-color:#a94442;";
                } else {
                    return "border-color:#209e91;";
                }
            }

        $scope.getlistuser = function () {
            var msg = {
                type: "call",
                node: "userman.listUsers"
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

        $scope.getlistuser();

        $scope.openmodal = function (page, size, id, un, n) {
            $scope.userid = id;
            $scope.username = un;
            $scope.name = n;
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

    user.controller('newuser', function ($scope, zdsSocket, toastr) {
        $scope.$on('modal.closing', function (event, args) {
            $scope.getlistuser();
        });
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
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
            }
        }
    });

    user.controller('removeuser', function ($scope, zdsSocket, toastr) {
        $scope.$on('modal.closing', function (event, args) {
            $scope.getlistuser();
        });
        $scope.doremove = function () {
            var msg = {
                type: "call",
                node: "userman.removeUser",
                data: {value: $scope.userid}
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('کاربر با موفقیت حذف شد!');

                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
            }
        }
    });

    user.controller('edituser', function ($scope, zdsSocket, toastr) {
        $scope.$on('modal.closing', function (event, args) {
            $scope.getlistuser();
        });
        $scope.doedit = function () {
            var msg = {
                type: "call",
                node: "userman.modifyUser",
                data: {userID: $scope.userid, username: $scope.username, password: $scope.pwd, name: $scope.name}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('اطلاعات با موفقیت اعمال شد');
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
        $scope.$on('modal.closing', function (event, args) {
            $scope.getlistuser();
        });
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
                node: "userman.listPermissions"
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
                data: {id: $scope.userid, permissions: temp}
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true){
                    toastr.success('اطلاعات با موفقیت اعمال شد');
                } else {
                    toastr.error('!', 'خطا!');

                }
            });

        }

        $scope.getperm = function () {
            var msg = {
                type: "call",
                node: "userman.listUserPermissions",
                data: {value: $scope.userid}
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {

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

    user.controller('usergroup', function ($scope, zdsSocket, toastr) {
        $scope.$on('modal.closing', function (event, args) {
            $scope.getlistuser();
        });
        $scope.treegroup = [];
        $scope.newgroup = {};
        $scope.col_defs = [
            {
                field: "usergroupID",
                displayName: "#"
            },
            {
                field: "state",
                displayName: "وضعیت",
                cellTemplate: "<nz-toggle on-toggle=\"cellTemplateScope.click(row.branch[\'state\'],row.branch[\'usergroupID\'])\" ng-model='row.branch.state' val-false=false val-true=true>",
                cellTemplateScope: {
                    click: function (data, id) {         // this works too: $scope.someMethod;
                        $scope.newgroup[id.toString()] = data;
                        console.log($scope.newgroup);
                    }
                }
            }
        ];

        $scope.getgroups = function () {
            var msg = {
                type: "call",
                node: "userman.listUsergroups"
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {

                    if (data["success"] == true && data["data"]["userGroupsList"].length > 0) {
                        $scope.allgroups = data['data']['userGroupsList'];
                        for (var i in $scope.allgroups){
                            $scope.allgroups[i]['state']=false;
                        }
                        $scope.mergegroup();
                        var t = treefy2($scope.allgroups);
                        $scope.treegroup = JSON.parse('[' + JSON.stringify(t) + ']');
                        console.log(JSON.stringify(t));
                    } else {
                        toastr.warning('اطلاعاتی موجود نیست');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
            }
        }

        $scope.addgroup = function () {
            var temp = [];
            for (var i in $scope.newgroup){
                if ($scope.newgroup.hasOwnProperty(i)) {
                    temp.push({id: parseInt(i), state: $scope.newgroup[i]});
                }
            }
            var msg = {
                type: "call",
                node: "userman.updateUserUsergroup",
                data: {id: $scope.userid, list: temp}
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    toastr.success('تغییرات با موفقیت اعمال شد!');
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }
        $scope.getusergroups = function () {
            var msg = {
                type: "call",
                node: "userman.listGroups",
                data: {value: $scope.userid}
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    $scope.mygroup = data['data']['userGroupsList'];
                    $scope.getgroups();

                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }

        $scope.mergegroup = function (){

            for (var j = 0; j<$scope.mygroup.length; j++) {
                for (var i = 0; i < $scope.allgroups.length; i++) {
                    //$scope.allgroups[i]['state'] = false;

                    if ($scope.allgroups[i]['usergroupID'] == $scope.mygroup[j]['usergroupID']) {
                        $scope.allgroups[i]['state'] = true;
                    }
                }
            }
        }

        $scope.getusergroups();
    });

    user.controller('usercontact',function(zdsSocket,$scope,toastr){
        $scope.$on('modal.closing', function (event, args) {
            $scope.getlistuser();
        });
        $scope.usercontacts = function () {
            var msg = {
                type: "call",
                node: "userman.listContacts",
                data: {value: $scope.userid}
            };
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    $scope.contacts = data['data']['contactList'];
                    if ($scope.contacts.length>0) {
                        $scope.getinfo();
                    } else {
                        $scope.listcontact = [];
                    }
                } else {
                    toastr.error('!', 'خطا!');
                }
                    //$scope.listusers();
            });
        }
        $scope.getinfo = function (){
            var list = [];
            for (var i=0; i<$scope.contacts.length; i++){
                list.push(parseInt($scope.contacts[i].ContactID));
            }
            var msg = {
                type: "call",
                node: "userman.listUsers",
                data: {idlist: list}
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {

                $scope.listcontact = data['data']['userList'];

            });
        }
        $scope.listusers = function () {
            var msg = {
                type: "call",
                node: "userman.listUsers"
            };
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    $scope.userslist = data['data']['contactList'];
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }
        $scope.addcontact = function (uid) {
            var msg = {
                type: "call",
                node: "userman.addContact",
                data:{userID:$scope.userid,contactID:$scope.id,note:$scope.note}
            };
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    $scope.usercontacts();
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }
        $scope.doremove = function (id) {
            var msg = {
                type: "call",
                node: "userman.removeContact",
                data:{userID:$scope.userid,contactID:id}
            };
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    $scope.usercontacts();
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }
        $scope.usercontacts();
    });

    user.controller('ban',function(zdsSocket,$scope,toastr){
        $scope.$on('modal.closing', function (event, args) {
            $scope.getlistuser();
        });
        $scope.doban = function () {
            var msg = {
                type: "call",
                node: "userman.banuser",
                data: {userid: $scope.userid,ban:$scope.banstate,banreason:$scope.dec}
            };
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    toastr.success('حساب کاربر مورد نظر مسدود شد!');
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }
    });

    function routeConfig($stateProvider) {
        $stateProvider
            .state('user-mng.user', {
                url: '/user',
                templateUrl: 'app/pages/user-mng/user/user.html',
                title: 'کاربران',
                permission: 'userman.listUsers',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 3,
                },
            });
    }

})();
