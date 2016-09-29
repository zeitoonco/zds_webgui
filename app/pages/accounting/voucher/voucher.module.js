/**
 * Created by Mohammad on 09/15/2016.
 */
(function () {
    var cid;
    'use strict';
    var voucher = angular.module('ZDSGUI.pages.accounting.voucher', ['ngJalaliFlatDatepicker'])
        .config(routeConfig);

    voucher.controller('newvoucher', function ($scope, zdsSocket, toastr) {

        $scope.dlEnabled = [true];
        $scope.dlIndexId = [];
        $scope.items = []; //voucher items

        //add empty object as row in items
        $scope.additem = function () {
            $scope.items.push({
                accountid: '0',
                dlid: '0',
                debit: '0',
                credit: '0',
                trackingnumber: '0',
                trackingdate: '2000-11-11',
                description: '--'
            });

        };

        //print log of items content as object for test
        $scope.itemlog = function () {
            console.log(JSON.stringify($scope.items));
        };
        //remove a row in items by index
        $scope.removeitem = function (index) {
            $scope.items.splice(index, 1);
            $scope.difference();
        };

        $scope.difference = function () {
            var sd = 0, sc = 0;
            for (var i in $scope.items) {
                sd = sd + parseInt($scope.items[i].debit);
                sc = sc + parseInt($scope.items[i].credit);
            }
            $scope.d = parseInt(sd - sc);
            if ($scope.d > 0 || $scope.d < 0){
                $scope.dcolor = 'red';
            } else {
                $scope.dcolor = 'grey';
            }
        };

        $scope.addvoucher = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.createNewVocher",
                data: {
                    userid: uid,
                    number: $scope.vid,
                    date: $scope.fvdate,
                    referencenumber: $scope.refnumber,
                    secondarynumber: 0,
                    state: 1,
                    type: 1,
                    description: $scope.dec,
                    items: $scope.items
                }
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    toastr.success('سند مالی جدید اضافه شد!');

                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        };

        $scope.checkdl = function (d, index) {
            $scope.dlIndexId[d] = index;
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {
                    'table': 'Account',
                    'columns': ['hasdl', 'accountid'],
                    'where': [['accountid', '=', d]]
                }
            };
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    $scope.hasdl = data.data.result.rows[0][0];

                    if ($scope.hasdl == 't') {
                        var c = 'dl' + $scope.dlIndexId[parseInt(data.data.result.rows[0][1])];
                        document.getElementById(c).className = "";
                    } else {
                        var c = 'dl' + $scope.dlIndexId[parseInt(data.data.result.rows[0][1])];
                        document.getElementById(c).className = "dldisabled";
                    }
                    console.log(JSON.stringify($scope.acid));
                } else {
                    toastr.error('!', 'خطا!');
                }
            });

        };
        $scope.getaccountid = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {
                    'table': 'Account',
                    'columns': ['accountid', 'hasdl', 'title2'],
                    'where': [['type', '=', '3', 'AND'], ['del', '=', '0']]

                }
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        $scope.acid = data.data.result.rows;
                        console.log(JSON.stringify($scope.acid));
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
            }
        }
        $scope.getdlid = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {
                    'table': 'DL',
                    'columns': ['dlid' ,'code' , 'title2'],
                    'where': [['del', '=', '0', 'AND'], ['isactive', '=', '1']]

                }
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        $scope.dlid = data.data.result.rows;
                        console.log(JSON.stringify($scope.acid));
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
            }
        }
        $scope.getaccountid();
        $scope.getdlid();

        $scope.datepickerConfig = {
            dateFormat: 'jYYYY/jMM/jDD',
            gregorianDateFormat: 'YYYY-MM-DD',
            minDate: moment.utc('2014', 'YYYY'),
            allowFuture: true
        };
    });

    voucher.controller('editvoucher', function ($scope, zdsSocket, toastr) {
        $scope.dlEnabled = [true];
        $scope.dlIndexId = [];
        $scope.items = []; //voucher items

        //add empty object as row in items
        $scope.additem = function () {
            $scope.items.push([
                '0',
                '0',
                '--',
                '0',
                '0',
                '0',
                '2000-11-11'
            ]);

        };

        //print log of items content as object for test
        $scope.itemlog = function () {
            console.log(JSON.stringify($scope.items));
        };
        //remove a row in items by index
        $scope.removeitem = function (index) {
            $scope.items.splice(index, 1);
            $scope.difference();
        };

        $scope.difference = function () {
            var sd = 0, sc = 0;
            for (var i in $scope.items) {
                sd = sd + parseInt($scope.items[i].debit);
                sc = sc + parseInt($scope.items[i].credit);
            }
            $scope.d = parseInt(sd - sc);
            if ($scope.d > 0 || $scope.d < 0){
                $scope.dcolor = 'red';
            } else {
                $scope.dcolor = 'grey';
            }
        };
        $scope.checkdl = function (d, index) {
            $scope.dlIndexId[d] = index;
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {
                    'table': 'Account',
                    'columns': ['hasdl', 'accountid'],
                    'where': [['accountid', '=', d]]
                }
            };
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    $scope.hasdl = data.data.result.rows[0][0];

                    if ($scope.hasdl == 't') {
                        var c = 'dl' + $scope.dlIndexId[parseInt(data.data.result.rows[0][1])];
                        document.getElementById(c).className = "";
                    } else {
                        var c = 'dl' + $scope.dlIndexId[parseInt(data.data.result.rows[0][1])];
                        document.getElementById(c).className = "dldisabled";
                    }
                    console.log(JSON.stringify($scope.acid));
                } else {
                    toastr.error('!', 'خطا!');
                }
            });

        };
        $scope.getaccountid = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {
                    'table': 'Account',
                    'columns': ['accountid', 'hasdl', 'title2'],
                    'where': [['type', '=', '3', 'AND'], ['del', '=', '0']]

                }
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        $scope.acid = data.data.result.rows;
                        console.log(JSON.stringify($scope.acid));
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
            }
        }
        $scope.getdlid = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {
                    'table': 'DL',
                    'columns': ['dlid' ,'code' , 'title2'],
                    'where': [['del', '=', '0', 'AND'], ['isactive', '=', '1']]

                }
            };
            if (zdsSocket.status() == 1) {
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        $scope.dlid = data.data.result.rows;
                        console.log(JSON.stringify($scope.acid));
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');
            }
        }
        $scope.getaccountid();
        $scope.getdlid();
        $scope.getinfo = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {'table': 'voucher', 'where': [['voucherid', '=', $scope.vid]]}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        $scope.myData = data.data.result.rows[0];
                        $scope.number = parseInt($scope.myData[1]);
                        $scope.refnumber = parseInt($scope.myData[3]);
                        $scope.vdate = moment($scope.myData[2]).format('jYYYY/jMM/jDD');
                        $scope.dnumber = $scope.myData[10];
                        $scope.dec = $scope.myData[8];
                        $scope.type = $scope.myData[6];

                        //toastr.success('اطلاعات با موفقیت دریافت شد!');
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {'table': 'voucheritem',
                    'columns': ['accountid', 'dlid','description', 'debit::INT8', 'credit::INT8','trackingnumber','trackingdate' ],
                    'where': [['voucherid', '=', $scope.vid]]}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        $scope.items = data.data.result.rows;
                        //toastr.success('اطلاعات با موفقیت دریافت شد!');
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
        }


        $scope.modifyvoucher = function () {
            $scope.finalitems = [];
            for (var i=0; i<$scope.items.length; i++){
                $scope.finalitems.push({
                    id: i+1,
                    accountid: $scope.items[i][0],
                    dlid: $scope.items[i][1],
                        description: $scope.items[i][2],
                    debit:$scope.items[i][3],
                    credit:$scope.items[i][4],
                    trackingnumber: $scope.items[i][5],
                    trackingdate: moment($scope.items[i][6]).format('YYYY-MM-DD')});
            }
            var msg = {
                type: "call",
                node: "AccountingRelay.modifyNewVocher",
                data: {
                    userid: uid,
                    id: $scope.vid,
                    number: $scope.number,
                    date: moment($scope.fvdate).format('YYYY-MM-DD'),
                    referencenumber: $scope.refnumber,
                    secondarynumber: 0,
                    state: 1,
                    type: 1,
                    description: $scope.dec,
                    items: $scope.finalitems
                }
            };
            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    toastr.success('اطلاعات با موفقیت اعمال شد!');

                } else {
                    toastr.error('!', 'خطا!');
                }
            });
        }
        $scope.getinfo();

        $scope.datepickerConfig = {
            dateFormat: 'jYYYY/jMM/jDD',
            gregorianDateFormat: 'YYYY-MM-DD',
            minDate: moment.utc('2014', 'YYYY'),
            allowFuture: true
        };
    });


    voucher.controller('voucher', function ($scope, zdsSocket, toastr, $uibModal) {
        $scope.openmodal = function (page, size, id,classname) {
            $scope.vid = id;
            $uibModal.open({
                animation: true,
                templateUrl: page,
                windowClass: classname,
                size: size,
                scope: $scope,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

        }
        $scope.getvoucher = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {'table': 'voucher', 'where': [['del', '=', '0']]}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        $scope.myData = data.data.result.rows;
                        //toastr.success('اطلاعات با موفقیت دریافت شد!');
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }

        }

        $scope.getvoucher();
    });

    voucher.controller('removevoucher',function ($scope,zdsSocket,$uibModal,toastr) {


        $scope.doremove = function (id) {
                var msg = {
                    type: "call",
                    node: "AccountingRelay.removeVoucher",
                    data: {userid: uid, id: $scope.vid}
                };
                if (zdsSocket.status() == 1) {
                    console.log(JSON.stringify(msg));
                    zdsSocket.send(msg, function (data) {
                        if (data["success"] == true) {
                            toastr.success('سند با موفقیت حذف شد!');
                        } else {
                            toastr.error('!', 'خطا!');
                        }
                    });
                } else {
                    toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

                }
        }
    });

    voucher.filter('jalaliDate', function () {
        return function (inputDate, format) {
            var date = moment(inputDate);
            return date.format(format);
        }
    });


    function routeConfig($stateProvider) {
        $stateProvider
            .state('accounting.voucher', {
                url: '/voucher',
                templateUrl: 'app/pages/accounting/voucher/voucher.html',
                title: 'سند مالی',
                sidebarMeta: {
                    order: 100
                }
            });
    }
})();