/**
 * Created by asus iran on 8/29/2016.
 */
(function () {
    'use strict';
    var chat = angular.module('ZDSGUI.pages.chat', [])
        .config(routeConfig);
    chat.controller('chat', function ($scope, zdsSocket, toastr, $uibModal) {
        $scope.$on('modal.closing', function (event, args) {
            $scope.getsess();
        });

        $scope.newsess = function () {
            var msg = {
                type: "call",
                node: "chat.newSession",
                data: {list:[20,23]}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {

                        $scope.myData = data['data']['userList'];

                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
            }
        };

        //$scope.getsess();
        $scope.listsess = function () {
            var msg = {
                type: "call",
                node: "chat.listSessions",
                data: {value:uid}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {

                        //$scope.myData = data['data']['userList'];

                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
            }
        };

        $scope.removemsg = function () {
            var msg = {
                type: "call",
                node: "chat.removeMessage",
                data: {value:1}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {

                        $scope.myData = data['data']['userList'];

                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
            }
        };

        $scope.newmsg = function () {
            var msg = {
                type: "call",
                node: "chat.newMessage",
                data: {userID:uid,sessionID:$scope.sid,msg:'hello',type:0}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {

                        $scope.myData = data['data']['userList'];

                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
            }
        };

        $scope.checknewmsg = function () {
            var msg = {
                type: "call",
                node: "chat.checkNewMessages",
                data: {value:0}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {

                        $scope.myData = data['data']['userList'];

                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
            }
        };

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

    function routeConfig($stateProvider) {
        $stateProvider
            .state('chat', {
                url: '/chat',
                templateUrl: 'app/pages/chat/chat.html',
                title: 'چت',
                permission: 'Chat',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 6,
                },
            });
    }

})();
/**
 * Created by asus iran on 12/26/2016.
 */
