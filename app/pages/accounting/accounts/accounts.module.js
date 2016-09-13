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
    account.controller('editaccount',function ($scope,zdsSocket,toastr) {
        $scope.accounttypes = [
            { label: "کل" , value: 1 },
            { label: "گروه", value: 2 },
            { label: "معین", value: 3 }
        ];


        $scope.indentity = {

        }

        $scope.refreshmodal = function () {
            if ($scope.selectedtype.value==3 || $scope.selectedtype.value==2){
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
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        $scope.myData = data.data.result.rows;
                        $scope.id = $scope.myData[0];

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
        $scope.test = ['1','2','3'];

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
                    'columns': ['accountid', 'type', 'title2', 'HasDL', 'HasCurrency', 'HasTracking', 'IsActive']
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
                    data: {userID: uid,id: id}
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

    account.controller('accounttree', function () {

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
