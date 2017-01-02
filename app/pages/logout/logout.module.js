/**
 * Created by asus iran on 1/2/2017.
 */
var logout = angular.module('ZDSGUI.pages.logout',['ngCookies']).config(routeConfig);

logout.controller('logout',function ($scope,$location, $rootScope, zdsSocket, toastr,baSidebarService,$cookies,$cookieStore) {
    var msg = {
        type: "call",
        node: "userman.logout",
        data: {value: uid}
    };
    if (zdsSocket.status() == 1) {
        $scope.LoginDisabled = true;
        zdsSocket.send(msg, function (data) {
            if (data["success"] == true) {
                $cookieStore.remove("authtoken");
                $cookieStore.remove("userid");
                $rootScope.$logedin = false;
                $location.path("/login");

            } else {
                toastr.error('خطایی رخ داده است!', 'خطا!');


            }
        });
    } else {
        toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
    }
});

function routeConfig($stateProvider) {
    $stateProvider
        .state('logout', {
            url: '/logout',
            title: 'خروج',
            templateUrl: 'app/pages/logout/logout.html'
        });
}