/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    var dash = angular.module('ZDSGUI.pages.dashboard', []).config(routeConfig);

    dash.controller('contact', function ($scope, zdsSocket, toastr, $uibModal) {
        var list = [];
        $scope.checkavatar = function (id) {
            return 'assets/pictures/nonavatar.jpg';
        }
        $scope.online = function (s) {
            if (s == 'true'){
                return "<i class=\"ion-at\" style=\"color:seagreen;\"></i>";
            } else if (s == 'false') {
                return "<i class=\"ion-at\" style=\"color:darkred;\"></i>";
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
                        $scope.getinfo();
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
                $scope.info = data['data']['userList'];
                //$scope.getavatar();
            });
        }
        /*$scope.getavatar = function () {
            $scope.mycontacts = [];
            for (var i=0 ; i<$scope.info.length; i++) {
                var msg = {
                    type: "call",
                    node: "userman.getUserAvatar",
                    data: {userID: $scope.info[i].userID}
                };
                    //console.log(JSON.stringify(msg));
                $scope.avatar(msg);
            }
            console.log(JSON.stringify($scope.mycontacts));
        }*/
        $scope.avatar = function (msg) {
            zdsSocket.send(msg, function (data) {
                var pic = data.data.image;
                pic = pic.replace(/\\/g, "");
                pic = "data:image/png;base64," + pic;
                $scope.mycontacts.push({id: $scope.info[i].userID, name: $scope.info[i].name, avatar: pic});
                console.log(JSON.stringify($scope.mycontacts));

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
