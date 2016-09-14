/**
 * Created by Pedram2 on 8/30/2016.
 */

/**
 * @author v.lugovsky
 * created on 21.12.2015
 */

(function () {
    'use strict';
var aid;
    var account = angular.module('ZDSGUI.pages.accounting.accounts', ['ZDSGUI.pages.components.tree', 'ZDSGUI.boolean'])
        .config(routeConfig);
    account.controller('newaccount',function ($scope,zdsSocket,toastr){
        $scope.hbtc = 0;
        $scope.hsdl = 0;
        $scope.hc = 0;
        $scope.hcc = 0;
        $scope.ht = 0;
        $scope.accounttypes = [
            { label: "کل" , value: 1 },
            { label: "گروه", value: 2 },
            { label: "معین", value: 3 }
        ];

        $scope.refreshmodal = function () {
            if ($scope.type.value==3 || $scope.type.value==2){
                //alert("گروه یا معین");
                $scope.i1 = 'بدهکار';
                $scope.i2 = 'بستانکار';
                $scope.i3 = 'مهم نیست';
            } else {
                //alert("معین");
                $scope.i1 = 'ترازنامه ای';
                $scope.i2 = 'سود و زیانی';
                $scope.i3 = 'انتظامی';
            }
        }

        $scope.addaccount = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.newAccount",
                data:{userid: uid,parent: $scope.pid,type: $scope.type.value,code: $scope.code,title: $scope.title,title2: $scope.title,isactive : $scope.en,cashflowcategory: '0',
                    openingbalance: '0',balancetype: $scope.btype,hasbalancetypecheck: $scope.hbtc,hasdl: $scope.hsdl,
                    hascurrency: $scope.hc,hascurrencyconversion: $scope.hcc,hastracking: $scope.ht,hastrackingcheck:'0'}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('حساب جدید اضافه شد!');

                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
        }
    });



    account.controller('editaccount',function ($scope,zdsSocket,toastr) {
        $scope.hbtc = 0;
        $scope.hsdl = 0;
        $scope.hc = 0;
        $scope.hcc = 0;
        $scope.ht = 0;
        $scope.accounttypes = [
            { label: "کل" , value: 1 },
            { label: "گروه", value: 2 },
            { label: "معین", value: 3 }
        ];

        $scope.refreshmodal = function () {
            if ($scope.type.value==3 || $scope.type.value==2){
                //alert("گروه یا معین");
                $scope.i1 = 'بدهکار';
                $scope.i2 = 'بستانکار';
                $scope.i3 = 'مهم نیست';
            } else {
                //alert("معین");
                $scope.i1 = 'ترازنامه ای';
                $scope.i2 = 'سود و زیانی';
                $scope.i3 = 'انتظامی';
            }
        }

        $scope.getinfo = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {
                    'table': 'Account',
                    'where': [['accountid', '=', aid]]
                }
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        $scope.myData = data.data.result.rows;
                        $scope.pid = $scope.myData[1];
                        $scope.title = $scope.myData[5];
                        $scope.code = $scope.myData[4];


                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
        }
        $scope.modifyaccount = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.modifyAccount",
                data:{userid: uid,id: aid,parent: $scope.pid,type: $scope.type.value,code: $scope.code,title: $scope.title,title2: $scope.title,isactive : $scope.en,cashflowcategory: '0',
                    openingbalance: '0',balancetype: $scope.btype,hasbalancetypecheck: $scope.hbtc,hasdl: $scope.hsdl,
                    hascurrency: $scope.hc,hascurrencyconversion: $scope.hcc,hastracking: $scope.ht,hastrackingcheck:'0'}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('تغییرات با موفقیت اعمال شد!');

                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
        }
        $scope.getinfo();
    });

    account.controller('accounttable', function ($scope, zdsSocket, toastr, $uibModal) {

        $scope.openmodal = function (page, size, id) {
            aid = id;
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
        $scope.getaccounts = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {
                    'table': 'Account',
                    'columns': ['accountid', 'type', 'title2', 'HasDL', 'HasCurrency', 'HasTracking', 'IsActive'],
                    'where': [['del', '=', '0']]

                }
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        $scope.myData = data.data.result.rows;
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }

        }
        $scope.doremove = function (id) {
            var alert = confirm("آیا از حذف این حساب مطمئن هستید؟");
            if (alert == true){
                var msg = {
                    type: "call",
                    node: "AccountingRelay.removeAccount",
                    data: {userid: uid,id: id}

                };
                if (zdsSocket.status() == 1) {
                    zdsSocket.send(msg, function (data) {
                        if (data["success"] == true) {
                            toastr.success('حساب حذف گردید!')
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




        $scope.getaccounts();


    });

    account.controller('accounttree', function ($scope,zdsSocket, toastr) {

    });

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('accounting.accounts', {
                url: '/accounts',
                templateUrl: 'app/pages/accounting/accounts/accounts.html',
                title: 'حساب ها',
                sidebarMeta: {
                    order: 800
                }
            });
    }

})();
