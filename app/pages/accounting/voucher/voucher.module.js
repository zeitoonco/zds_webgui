/**
 * Created by Mohammad on 09/15/2016.
 */
(function () {
    var cid;
    'use strict';
    var voucher = angular.module('ZDSGUI.pages.accounting.voucher',['ngJalaliFlatDatepicker'])
        .config(routeConfig);
    voucher.controller('newvoucher',function ($scope,zdsSocket,toastr) {

        $scope.datepickerConfig = {
            dateFormat: 'jYYYY/jMM/jDD',
            gregorianDateFormat: 'YYYY-DD-MM',
            minDate: moment.utc('2014', 'YYYY'),
            allowFuture: true
        };

        $scope.items = [];
        $scope.additem = function () {
            $scope.items.push({accountid:'' ,dlid:'' ,debit:'' ,credit:'' ,trackingnumber:'' ,trackingdate:'' ,description:''});

        }
        
        
        
        
        $scope.addcategory = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.newvoucher",
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
    voucher.controller('editvoucher',function ($scope,zdsSocket,toastr) {
        $scope.types = [
            { label: "ترازنامه ای" , value: 1 },
            { label: "سود و زیانی", value: 2 }
        ];

        $scope.modifycategory = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.modifyvoucher",
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


    voucher.controller('voucher',function ($scope,zdsSocket,toastr,$uibModal) {
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
        $scope.getvoucher = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {'table': 'voucher'}
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
                    node: "AccountingRelay.removevoucher",
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
                    order: 900
                }
            });
    }
})();