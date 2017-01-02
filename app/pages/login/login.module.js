var uid, myname, myun, mypic,permns;
(function () {
    'use strict';

    var login = angular.module('ZDSGUI.pages.login', ['ngCookies'])
        .config(routeConfig);
    login.controller('loginAction', function ($scope, $location, $rootScope, zdsSocket, toastr, baSidebarService,$cookies,$cookieStore) {
        $scope.logedin = false;
        $scope.username = "admin";
        $scope.password = "admin";
        $scope.mypic = function () {
            var msg = {
                type: "call",
                node: "userman.getUserAvatar",
                data: {userID: uid}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        mypic = data.data.image;
                        mypic = mypic.replace(/\\/g, "");
                        mypic = "data:image/png;base64," + mypic;
                        document.getElementById('mypic').setAttribute('src', mypic);
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
        }
        $scope.nologin = function () {
            var msg = {
                type: "call",
                node: "userman.login",
                id: "1234568",
                data: {authtoken: token, userid: userid}
            };
            if (zdsSocket.status()!=1){
                window.setTimeout(function(){
                    console.log(JSON.stringify(msg));
                    zdsSocket.send(msg, function (data) {
                        if (data["data"]["result"] == "ok") {
                            uid = data.data.userInfo['userID'];
                            myname = data.data.userInfo['name'];
                            myun = data.data.userInfo['username'];
                            $scope.mypic();
                            $rootScope.$permissions = [];
                            var index;
                            permns = data.data.permissions;
                            for (index = 0; index < data.data.permissions.length; ++index) {
                                if (data.data.permissions[index].state == "true")
                                    $rootScope.$permissions.push(data.data.permissions[index].name);
                            }
                            baSidebarService.setPermissions($rootScope.$permissions);
                            $rootScope.$logedin = true;
                            //$scope.mypic();
                            $location.path("/dashboard");

                        } else {
                            toastr.error('نام کاربری یا رمز عبور اشتباه است!', 'خطا!');
                            $scope.LoginDisabled = false;
                        }
                    });
                },1500);
            } else {
                zdsSocket.send(msg, function (data) {
                    if (data["data"]["result"] == "ok") {
                        uid = data.data.userInfo['userID'];
                        myname = data.data.userInfo['name'];
                        myun = data.data.userInfo['username'];
                        $scope.mypic();
                        //mypwd = data.data.userInfo['password'];
                        $rootScope.$permissions = [];
                        var index;

                        permns = data.data.permissions;
                        for (index = 0; index < data.data.permissions.length; ++index) {
                            if (data.data.permissions[index].state == "true")
                                $rootScope.$permissions.push(data.data.permissions[index].name);
                        }
                        baSidebarService.setPermissions($rootScope.$permissions);
                        $rootScope.$logedin = true;
                        //$scope.mypic();
                        $location.path("/dashboard");
                    } else {
                        toastr.error('نام کاربری یا رمز عبور اشتباه است!', 'خطا!');
                        $scope.LoginDisabled = false;
                    }
                });
            }
        }
            var token = $cookieStore.get('authtoken');
            var userid = $cookieStore.get('userid');
            if (token != undefined && token.length > 0 && $rootScope.$logedin!=true) {
            $scope.logedin = true;
                console.log(token);
                console.log(userid);
            $scope.nologin();
            } else {
                //$scope.logedin = $rootScope.$logedin = false;
                $scope.LoginDisabled = false;
                //$scope.username = "admin";
                //$scope.password = "admin";

                $scope.dologin = function () {
                    var msg = {
                        type: "call",
                        node: "userman.login",
                        id: "1234568",
                        data: {username: $scope.username, password: $scope.password, rememberme: $scope.rememberme}
                    };
                    if (zdsSocket.status() == 1) {
                        $scope.LoginDisabled = true;
                        zdsSocket.send(msg, function (data) {
                            if (data["data"]["result"] == "ok") {
                                if (data['data']['authtoken'] != "") {
                                    $cookieStore.put("authtoken", data['data']['authtoken']);
                                    console.log($cookieStore.get('authtoken'));
                                }
                                uid = data.data.userInfo['userID'];
                                $cookieStore.put("userid", uid);
                                myname = data.data.userInfo['name'];
                                myun = data.data.userInfo['username'];
                                //mypwd = data.data.userInfo['password'];
                                $rootScope.$permissions = [];
                                var index;

                                permns = data.data.permissions;
                                for (index = 0; index < data.data.permissions.length; ++index) {
                                    if (data.data.permissions[index].state == "true")
                                        $rootScope.$permissions.push(data.data.permissions[index].name);
                                }
                                baSidebarService.setPermissions($rootScope.$permissions);
                                $rootScope.$logedin = true;
                                $scope.mypic();
                                $location.path("/dashboard");

                            } else {
                                toastr.error('نام کاربری یا رمز عبور اشتباه است!', 'خطا!');
                                $scope.LoginDisabled = false;

                            }
                        });
                    } else {
                        toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
                    }
                    console.log("Hello! " + $scope.username)
                }

            }


    });



    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/pages/login/login.html',
                title: 'ورود'
            });
    }

})();