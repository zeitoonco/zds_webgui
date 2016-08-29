(function () {
    'use strict';

    var login = angular.module('ZDSGUI.pages.login', [])
        .config(routeConfig);
    login.controller('loginAction', function ($scope, zdsSocket) {


        $scope.dologin = function () {
            var msg = {
                type: "call",
                node: "userman.login",
                id: "1234568",
                data: {username: $scope.username, password: $scope.password}
            };
            zdsSocket.send(msg);
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