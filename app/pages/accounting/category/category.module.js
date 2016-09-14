/**
 * Created by asus iran on 9/14/2016.
 */
(function () {
    'use strict';
    var category = angular.module('ZDSGUI.pages.accounting.category',[])
        .config(routeConfig);
    category.controller('category',function ($scope,zdsSocket,toastr) {

        $scope.getcategory = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {'table': 'Category'}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                       // $scope.myData = data;
                        toastr.success('اطلاعات با موفقیت دریافت شد!');
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }

        }
        $scope.getcategory();
    });

    function routeConfig($stateProvider) {
        $stateProvider
            .state('accounting.category', {
                url: '/category',
                templateUrl: 'app/pages/accounting/category/category.html',
                title: 'طبقه بندی',
                sidebarMeta: {
                    order: 900
                }
            });
    }
})();