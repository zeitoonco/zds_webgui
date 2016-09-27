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
                $scope.i1 = 'بدهکار';
                $scope.i2 = 'بستانکار';
                $scope.i3 = 'مهم نیست';
            } else {
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
                data: {
                    userid: uid,
                    id: aid,
                    parent: $scope.pid,
                    type: $scope.type.value,
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
                    hastrackingcheck: '0'
                }
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
    });

    account.controller('accounttable', function ($scope, zdsSocket, toastr, $uibModal) {
        $scope.tableconfig = {
            itemsPerPage: 2,
            fillLastPage: true
        }


        $scope.openmodal = function (page, size, id,t,title,c,pid,en,btype,hbtc) {
            $scope.id = id;
            switch (t){
                case '1':
                    $scope.type = 'گروه';
                    $scope.i1 = 'ترازنامه ای';
                    $scope.i2 = 'سود و زیانی';
                    $scope.i3 = 'انتظامی';
                    break;
                case '2':
                    $scope.type = 'کل';
                    $scope.i1 = 'بدهکار';
                    $scope.i2 = 'بستانکار';
                    $scope.i3 = 'مهم نیست';
                    break;
                case '3':
                    $scope.type = 'معین';
                    $scope.i1 = 'بدهکار';
                    $scope.i2 = 'بستانکار';
                    $scope.i3 = 'مهم نیست';
                    break;
            }
            $scope.title = title;
            $scope.code = parseInt(c);
            $scope.pid = parseInt(pid);
            if (en=='t'){
                $scope.en = true;
            }else {
                $scope.en = false;
            }
            $scope.btype = parseInt(btype);
            $scope.hbtc = true;

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
                        'HasTracking', 'IsActive','code','parentid','balancetype','hasbalancetypecheck'],
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


        $scope.getaccounts();
    });

    account.controller('removeaccount', function ($scope,zdsSocket,toastr,$uibModal) {

        $scope.doremove = function () {
                var msg = {
                    type: "call",
                    node: "AccountingRelay.removeAccount",
                    data: {userid: uid,id: $scope.id}

                };
                if (zdsSocket.status() == 1) {
                    zdsSocket.send(msg, function (data) {
                        if (data["success"] == true) {
                            toastr.success('حساب حذف گردید!');
                        } else {
                            toastr.error('!', 'خطا!');
                        }
                    });
                } else {
                    toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

                }

        }
        $scope.getaccounts();
    });

    account.controller('accounttree', function ($scope, zdsSocket, toastr,$uibModal) {
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
                    'columns': ['accountid', 'parentid', 'title2','Type'],
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
                sidebarMeta: {
                    order: 101
                }
            });
    }

})();
