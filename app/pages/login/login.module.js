var uid,myname,myun,mypic;
(function () {
    'use strict';

    var login = angular.module('ZDSGUI.pages.login', [])
        .config(routeConfig);
    login.controller('loginAction', function ($scope, $location, $rootScope, zdsSocket, toastr) {
        $scope.LoginDisabled = false;
        $scope.username = "admin";
        $scope.password = "admin";
        $scope.dologin = function () {

            var msg = {
                type: "call",
                node: "userman.login",
                id: "1234568",
                data: {username: $scope.username, password: $scope.password}
            };
            if (zdsSocket.status() == 1) {
                $scope.LoginDisabled = true;
                zdsSocket.send(msg, function (data) {
                    if (data["data"]["result"] == "ok") {
                        uid = data.data.userInfo['userID'];
                        myname = data.data.userInfo['name'];
                        myun = data.data.userInfo['username'];
                        //mypwd = data.data.userInfo['password'];
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
                        toastr.success('اطلاعات با موفقیت اعمال شد');

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