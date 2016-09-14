/**
 * Created by asus iran on 9/14/2016.
 */
(function () {
    var cid;
    'use strict';
    var category = angular.module('ZDSGUI.pages.accounting.category',[])
        .config(routeConfig);
    category.controller('newcategory',function ($scope,zdsSocket,toastr) {
        $scope.types = [
            { label: "ترازنامه ای" , value: 1 },
            { label: "سود و زیانی", value: 2 }
        ];

        $scope.addcategory = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.newCategory",
                data:{userid: uid,title: $scope.title,type: $scope.type.value}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('طبقه ی جدید اضافه شد!');

                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
        }
    });
    category.controller('editcategory',function ($scope,zdsSocket,toastr) {
        $scope.types = [
            { label: "ترازنامه ای" , value: 1 },
            { label: "سود و زیانی", value: 2 }
        ];

        $scope.modifycategory = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.modifyCategory",
                data:{userid: uid,id: cid,title: $scope.title,type: $scope.type.value}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('طبقه ی جدید اضافه شد!');

                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
        }
    });


    category.controller('category',function ($scope,zdsSocket,toastr,$uibModal) {
        $scope.openmodal = function (page, size, id) {
            cid = id;
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
            //$modalInstance.$scope.username = 'ali';

        }
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
                       $scope.myData = data.data.result.rows;
                        toastr.success('اطلاعات با موفقیت دریافت شد!');
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }

        }
        $scope.doremove = function (id) {
            var alert = confirm("آیا از حذف این طبقه مطمئن هستید؟");
            if (alert == true){
            var msg = {
                type: "call",
                node: "AccountingRelay.removeCategory",
                data: {userid: uid,id: id}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('طبقه با موفقیت حذف شد!');
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
            } else {

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