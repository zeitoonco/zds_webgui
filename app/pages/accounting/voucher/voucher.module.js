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
                trackingdate: '0000-00-00',
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
                    toastr.success('طبقه ی جدید اضافه شد!');

                } else {
                    toastr.error('!', 'خطا!');
                }
            });

        };
        /*$scope.dlEnabledFunction = function (row) {
            console.log("yay" + row);
            return (row in $scope.dlEnabled);
        };*/
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
                          //$scope.dlEnabled[$scope.dlIndexId[parseInt(data.data.result.rows[0][1])]] = true;

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
        $scope.check = function (id) {
            alert(id);
            if (id[1] == 'f') {
                return true;
            } else if (id[1] == 't') {
                return false;
            }
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

        $scope.getaccountid();

        $scope.datepickerConfig = {
            dateFormat: 'jYYYY/jMM/jDD',
            gregorianDateFormat: 'YYYY-MM-DD',
            minDate: moment.utc('2014', 'YYYY'),
            allowFuture: true
        };
    });


    voucher.controller('editvoucher', function ($scope, zdsSocket, toastr) {
        $scope.get = function (id) {
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {'table': 'voucher', 'where': [['id', '=', id]]}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        $scope.myData = data.data.result.rows;
                        $scope.accountid = $scope.myData[1];
                        $scope.referencenumber = $scope.myData[2];
                        $scope.accountid = $scope.myData[1];
                        $scope.accountid = $scope.myData[1];
                        $scope.accountid = $scope.myData[1];
                        toastr.success('اطلاعات با موفقیت دریافت شد!');
                    } else {
                        toastr.error('!', 'خطا!');
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
        }


        $scope.modifycategory = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.modifyVoucher",
                data: {userid: uid, id: cid, title: $scope.title, type: $scope.type.value}
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


    voucher.controller('voucher', function ($scope, zdsSocket, toastr, $uibModal) {
        $scope.openmodal = function (page, size, id, type, title) {
            cid = id;
            $scope.type = type;
            $scope.title = title;
            $uibModal.open({
                animation: true,
                templateUrl: page,
                windowClass: 'bigmodal',
                scope: $scope,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
            //$modalInstance.$scope.username = 'ali';

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
            if (alert == true) {
                var msg = {
                    type: "call",
                    node: "AccountingRelay.removeVoucher",
                    data: {userid: uid, id: id}
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
        $scope.getvoucher();
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