/**
 * Created by Mohammad on 09/15/2016.
 */
(function () {
    var cid;
    'use strict';
    var category = angular.module('ZDSGUI.pages.accounting.document',[])
        .config(routeConfig);
    category.controller('newdocument',function ($scope,zdsSocket,toastr) {
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
                        toastr.success('اطلاعات اعمال شد!');

                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
        }
    });


    category.controller('document',function ($scope,zdsSocket,toastr,$uibModal) {
        $scope.openmodal = function (page, size, id,type,title) {
            cid = id;
            $scope.type = type;
            $scope.title = title;
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
        //$scope.getcategory();
    });

    function routeConfig($stateProvider) {
        $stateProvider
            .state('accounting.document', {
                url: '/document',
                templateUrl: 'app/pages/accounting/document/document.html',
                title: 'سند مالی',
                sidebarMeta: {
                    order: 900
                }
            });
    }
})();