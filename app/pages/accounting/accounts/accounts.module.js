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
    var account = angular.module('ZDSGUI.pages.accounting.accounts', ['ZDSGUI.pages.components.tree', 'ZDSGUI.boolean', 'stPagination'])
        .config(routeConfig);
    account.controller('newaccount', function ($scope, zdsSocket, toastr) {
        $scope.hbtc = 0;
        $scope.hsdl = 0;
        $scope.hc = 0;
        $scope.hcc = 0;
        $scope.ht = 0;
        $scope.code = 0;
        $scope.pid = 0;
        $scope.$on('modal.closing', function (event, reason, closed) {
            $scope.getaccounts();
        });

        $scope.accounttypes = {1: 'گروه', 2: 'کل', 3: 'معین'};
        $scope.refreshmodal = function () {
            if ($scope.type == 3) {
                //alert("معین");
                $scope.i1 = 'بدهکار';
                $scope.i2 = 'بستانکار';
                $scope.i3 = 'مهم نیست';
                $scope.refreshpid('2');
            } else if ($scope.type == 2){
                $scope.i1 = 'بدهکار';
                $scope.i2 = 'بستانکار';
                $scope.i3 = 'مهم نیست';
                $scope.refreshpid('1');
            } else {
                //alert("معین");
                $scope.i1 = 'ترازنامه ای';
                $scope.i2 = 'سود و زیانی';
                $scope.i3 = 'انتظامی';
                $scope.refreshpid('0');
            }

        }

        $scope.refreshpid = function (type) {
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {
                    'table': 'Account',
                    'columns': ['accountid','title'],
                    'where': [['del', '=', '0','AND'],['type','=',type]]

                }
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    $scope.pids = data.data.result.rows;
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }

        $scope.addaccount = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.newAccount",
                data: {
                    userid: uid,
                    parent: $scope.pid,
                    type: $scope.type,
                    code: $scope.pid + $scope.code,
                    title: $scope.title,
                    title2: $scope.title,
                    isactive: $scope.en,
                    cashflowcategory: '0',
                    openingbalance: '0',
                    balancetype: $scope.btype,
                    hasbalancetypecheck: $scope.hbtc,
                    hasdl: $scope.hsdl,
                    hascurrency: $scope.hc,
                    hascurrencyconversion: $scope.hcc,
                    hastracking: $scope.ht,
                    hastrackingcheck: '0'
                }
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    toastr.success('حساب جدید اضافه شد!');

                } else {
                    toastr.error('!', 'خطا!');
                }
            });

        }
    });


    account.controller('editaccount', function ($scope, zdsSocket, toastr) {

        $scope.accounttypes = {1: 'گروه', 2: 'کل', 3: 'معین'};
        $scope.refreshmodal = function () {
            if ($scope.type == 3) {
                //alert("معین");
                $scope.i1 = 'بدهکار';
                $scope.i2 = 'بستانکار';
                $scope.i3 = 'مهم نیست';
                $scope.refreshpid('2');
            } else if ($scope.type == 2){
                $scope.i1 = 'بدهکار';
                $scope.i2 = 'بستانکار';
                $scope.i3 = 'مهم نیست';
                $scope.refreshpid('1');
            } else {
                //alert("معین");
                $scope.i1 = 'ترازنامه ای';
                $scope.i2 = 'سود و زیانی';
                $scope.i3 = 'انتظامی';
                $scope.refreshpid('0');
            }

        }

        $scope.refreshpid = function (type) {
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {
                    'table': 'Account',
                    'columns': ['accountid','title'],
                    'where': [['del', '=', '0','AND'],['type','=',type]]

                }
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    $scope.pids = data.data.result.rows;
                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }

        $scope.$on('modal.closing', function (event, reason, closed) {
            $scope.getaccounts();
        });


        $scope.getinfo = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {
                    'table': 'Account',
                    'where': [['accountid', '=', aid]]
                }
            };
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

        }
        $scope.modifyaccount = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.modifyAccount",
                data: {
                    userid: uid,
                    id: $scope.id,
                    parent: $scope.pid,
                    type: $scope.type,
                    code: $scope.code,
                    title: $scope.title,
                    title2: $scope.title,
                    isactive: $scope.en,
                    cashflowcategory: '0',
                    openingbalance: '0',
                    balancetype: $scope.btype,
                    hasbalancetypecheck: $scope.hbtc,
                    hasdl: $scope.hsdl,
                    hascurrency: $scope.hc,
                    hascurrencyconversion: $scope.hcc,
                    hastracking: $scope.ht,
                    hastrackingcheck: '0',

                }
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    toastr.success('تغییرات با موفقیت اعمال شد!');

                } else {
                    toastr.error('!', 'خطا!');
                }
            });

        }
    });

    account.controller('accounttable', function ($scope, zdsSocket, toastr, $uibModal,editableThemes,editableOptions) {
        $scope.tableconfig = {
            itemsPerPage: 2,
            fillLastPage: true
        }
        editableOptions.theme = 'bs3';

        $scope.openmodal = function (page, size, x) {
            $scope.id = x[0];
            $scope.type = x[1];
            switch (x[1]) {
                case '1':
                    $scope.i1 = 'ترازنامه ای';
                    $scope.i2 = 'سود و زیانی';
                    $scope.i3 = 'انتظامی';
                    break;
                case '2':
                    $scope.i1 = 'بدهکار';
                    $scope.i2 = 'بستانکار';
                    $scope.i3 = 'مهم نیست';
                    break;
                case '3':
                    $scope.i1 = 'بدهکار';
                    $scope.i2 = 'بستانکار';
                    $scope.i3 = 'مهم نیست';
                    break;
            }
            $scope.title = x[2];
            $scope.code = parseInt(x[0]);
            $scope.pid = parseInt(x[8]);
            $scope.en = x[6] == 't';
            $scope.btype = parseInt(x[9]);
            $scope.hbtc = x[10] == 't';
            $scope.hsdl = x[3] == 't';
            $scope.hc = x[4] == 't';
            $scope.hcc = x[11] == 't';
            $scope.ht = x[5] == 't';

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

        }
        $scope.getaccounts = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {
                    'table': 'Account',
                    'columns': ['accountid', 'type', 'title2', 'HasDL', 'HasCurrency',
                        'HasTracking', 'IsActive', 'code', 'parentid', 'balancetype', 'hasbalancetypecheck', 'HasCurrencyConversion'],
                    'where': [['del', '=', '0']]

                }
            };
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    $scope.myData = data.data.result.rows;
                    $scope.temp = [];
                    for (var i=0;i<$scope.myData.length;i++){
                        $scope.temp.push({accountid: $scope.myData[i][0],type: $scope.myData[i][1],title: $scope.myData[i][2],
                            hasdl: $scope.myData[i][3],hasc: $scope.myData[i][4],hast: $scope.myData[i][5],en: $scope.myData[i][6]});

                    }

                } else {
                    toastr.error('!', 'خطا!');
                }
            });


        }


        $scope.getaccounts();

    });

    account.controller('removeaccount', function ($scope, zdsSocket, toastr, $uibModal) {
        $scope.$on('modal.closing', function (event, reason, closed) {
            $scope.getaccounts();
        });

        $scope.doremove = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.removeAccount",
                data: {userid: uid, id: $scope.id}

            };
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    toastr.success('حساب حذف گردید!');
                    $dismiss();
                } else {
                    toastr.error('!', 'خطا!');
                }
            });


        }
        $scope.getaccounts();
    });

    account.controller('accounttree', function ($scope, zdsSocket, toastr, $uibModal) {
        $scope.ignoreChanges = false;
        //var newId = 0;
        $scope.ignoreChanges = false;
        $scope.newNode = {};
        $scope.activeId = 0;
        $scope.basicConfig = {

            core: {
                multiple: false,
                check_callback: true,
                worker: true,
                "rtl": true
            },
            'types': {
                'folder': {
                    'icon': 'ion-ios-folder'
                },
                'default': {
                    'icon': 'ion-document-text'
                }
            },
            'plugins': ['types'],
            'version': 1
        };
        $scope.openmodal = function (page, size, x) {
            $scope.id = x[0 + 4];
            switch (x[2 + 4]) {
                case '1':
                    $scope.i1 = 'ترازنامه ای';
                    $scope.i2 = 'سود و زیانی';
                    $scope.i3 = 'انتظامی';
                    break;
                case '2':
                    $scope.i1 = 'بدهکار';
                    $scope.i2 = 'بستانکار';
                    $scope.i3 = 'مهم نیست';
                    break;
                case '3':
                    $scope.i1 = 'بدهکار';
                    $scope.i2 = 'بستانکار';
                    $scope.i3 = 'مهم نیست';
                    break;
            }
            $scope.title = x[5 + 4];
            $scope.code = parseInt(x[3 + 4]);
            $scope.pid = parseInt(x[1 + 4]);
            $scope.en = x[6 + 4] == 't';
            $scope.btype = parseInt(x[9 + 4]);
            $scope.hbtc = x[10 + 4] == 't';
            $scope.hsdl = x[11 + 4] == 't';
            $scope.hc = x[12 + 4] == 't';
            $scope.hcc = x[13 + 4] == 't';
            $scope.ht = x[14 + 4] == 't';

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

        }
        $scope.refresh = function () {
            $scope.ignoreChanges = true;
            //newId = 0;
            $scope.treeData = $scope.actree;
            $scope.basicConfig.version++;
        };

        $scope.expand = function () {
            $scope.ignoreChanges = true;
            $scope.treeData.forEach(function (n) {
                n.state.opened = true;
            });
            $scope.basicConfig.version++;
        };
        $scope.clicknode = function (node, event) {
            for (var i = 0; i < $scope.myData.length; i++) {
                if ($scope.myData[i][0] === event.node.id) {
                    $scope.activeId = i;
                    $scope.$apply();
                    return
                }
            }
        };

        $scope.getaccounts = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {
                    'table': 'Account',
                    'columns': ['accountid', 'parentid', 'title2', 'Type', '*'],
                    'where': [['del', '=', '0']]

                }
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        $scope.myData = data.data.result.rows;
                        $scope.treemaker($scope.myData);
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }

        }
        $scope.treemaker = function (data) {
            var tree = [];
            for (var i = 0; i < data.length; i++) {
                var id = data[i][0];
                var parent = data[i][1];
                if (parent == null) {
                    parent = "#";
                }
                var text = data[i][2];
                tree.push({'id': id, 'parent': parent, 'text': text, 'state': {'opened': true}});

            }
            console.log(JSON.stringify(tree));
            $scope.actree = tree;
            $scope.refresh();
        }
        $scope.getaccounts();
    });

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('accounting.accounts', {
                url: '/accounts',
                templateUrl: 'app/pages/accounting/accounts/accounts.html',
                title: 'حساب ها',
                permission:'AccountingRelay.accountlist',
                sidebarMeta: {
                    order: 101
                }
            });
    }

})();
