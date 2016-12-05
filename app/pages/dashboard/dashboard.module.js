/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    var dash = angular.module('ZDSGUI.pages.dashboard', []).config(routeConfig);
    dash.controller('myinfo',function (zdsSocket,$scope){
        $scope.name = myname;
        var date = new Date();

        console.log(moment().format('jdddd'));
    });
    dash.controller('contact', function ($scope, zdsSocket, toastr, $uibModal) {
        var list = [];
        $scope.checkavatar = function (id) {
            return 'assets/pictures/nonavatar.jpg';
        }
        $scope.online = function (s) {
            if (s == 'true'){
                return "<i class=\"ion-android-person\" style=\"color:seagreen;\"></i>";
            } else if (s == 'false') {
                return "<i class=\"ion-android-person\" style=\"color:darkred;\"></i>";
            }
        }
        $scope.listcontacts = function () {
            var msg = {
                type: "call",
                node: "userman.listContacts",
                data: {value: uid}
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        $scope.contacts = data['data']['contactList'];
                        if ($scope.contacts.length>0) {
                            $scope.getinfo();
                        }
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
        }
        $scope.getinfo = function (){
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
                var temp = data['data']['userList'];
                for (var i in temp){
                    temp[i]["avatar"]='assets/pictures/nonavatar.jpg';
                }
                $scope.info = temp;
                $scope.getavatar();
            });
        }
        $scope.getavatar = function () {
            $scope.mycontacts = [];
            for (var i=0 ; i<$scope.info.length; i++) {
                var msg = {
                    type: "call",
                    node: "userman.getUserAvatar",
                    data: {userID: $scope.info[i].userID}
                };
                    console.log(JSON.stringify(msg));
                $scope.avatar(msg);
            }
        }
        $scope.avatar = function (msg) {
            zdsSocket.send(msg, function (data) {
                var mycontacts = [];
                var pic = data.data.image;
                if (pic!=""){
                    pic = pic.replace(/\\/g, "");
                    pic = "data:image/png;base64," + pic;
                } else {
                    pic = 'assets/pictures/nonavatar.jpg';
                }

                var id = data.data.userID;
                for (var i in $scope.info){
                   if ($scope.info[i].userID == id){
                       mycontacts.push({userID: $scope.info[i].userID, name: $scope.info[i].name,isOnline: $scope.info[i].isOnline, avatar: pic});
                   } else if ($scope.info[i].avatar=='assets/pictures/nonavatar.jpg'){
                       mycontacts.push({userID: $scope.info[i].userID, name: $scope.info[i].name,isOnline: $scope.info[i].isOnline, avatar: 'assets/pictures/nonavatar.jpg'});
                   } else {
                       mycontacts.push({userID: $scope.info[i].userID, name: $scope.info[i].name,isOnline: $scope.info[i].isOnline, avatar: $scope.info[i].avatar});
                   }
                }

                $scope.info = mycontacts;
            });
        }
        $scope.listcontacts();
    });

    dash.controller('group', function ($scope, zdsSocket, toastr, $uibModal) {
        function listgroup() {
            var msg = {
                type: "call",
                node: "userman.listGroups",
                id: "1234568",
                data: {value: uid}
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        $scope.mygroups = data['data']['userGroupsList'];
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
            }
        }
        listgroup();
    });
    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/pages/dashboard/dashboard.html',
                title: 'داشبورد',
                permission: '_masterPermission',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 0,
                },
            });
    }

})();
