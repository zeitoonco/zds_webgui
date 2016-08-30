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
                        $rootScope.$logedin = true;
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