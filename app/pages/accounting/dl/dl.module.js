/**
 * Created by asus iran on 9/14/2016.
 */
(function () {
    var dlid;
    'use strict';
    var dl = angular.module('ZDSGUI.pages.accounting.dl', ['ZDSGUI.boolean'])
        .config(routeConfig);
    dl.controller('newdl', function ($scope, zdsSocket, toastr) {

        $scope.adddl = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.newDl",
                data: {userid: uid, code: $scope.code, title: $scope.title, title2: $scope.title, type: 1, isactive: 1}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('تفضیلی جدید اضافه شد!');

                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
        }
    });
    dl.controller('editdl', function ($scope, zdsSocket, toastr) {

        $scope.modifydl = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.modifyDL",
                data: {
                    userid: uid,
                    id: dlid,
                    code: $scope.code,
                    title: $scope.title,
                    title2: $scope.title,
                    type: 1,
                    isactive: $scope.en
                }
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    toastr.success('اطلاعات اعمال شد!');

                } else {
                    toastr.error('!', 'خطا!');
                }
            });

        }
    });


    dl.controller('dl', function ($scope, zdsSocket, toastr, $uibModal) {
        $scope.openmodal = function (page, size, id, code, title, en) {
            $scope.dlid = id;
            $scope.code = code;
            $scope.title = title;
            $scope.en = en;
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
        $scope.getdl = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {'table': 'DL', 'where': [['del', '=', '0']]}
            };
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        $scope.myData = data.data.result.rows;
                        toastr.success('اطلاعات با موفقیت دریافت شد!');
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
        }

        $scope.getdl();
    });

    dl.controller('removedl', function ($scope,zdsSocket,toastr,$uibModal) {
        $scope.doremove = function () {
                var msg = {
                    type: "call",
                    node: "AccountingRelay.removeDL",
                    data: {userid: uid, dlid: $scope.dlid}
                };
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('تفضیلی با موفقیت حذف شد!');
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
        }
    });

    function routeConfig($stateProvider) {
        $stateProvider
            .state('accounting.dl', {
                url: '/dl',
                templateUrl: 'app/pages/accounting/dl/dl.html',
                title: 'حساب های تفضیلی',
                sidebarMeta: {
                    order: 102
                }
            });
    }
})();