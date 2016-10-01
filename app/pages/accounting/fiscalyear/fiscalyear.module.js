/**
 * Created by Pedram2 on 8/30/2016.
 */

/**
 * @author v.lugovsky
 * created on 21.12.2015
 */
(function () {
    var fyid;
    'use strict';

    var fiscalyear = angular.module('ZDSGUI.pages.accounting.fiscalyear', [
        'ZDSGUI.boolean', 'ngJalaliFlatDatepicker'])
        .config(routeConfig);

    fiscalyear.controller('editfiscal', function ($scope) {
        $scope.startdate = moment($scope.row[2]).format('jYYYY/jMM/jDD');
        $scope.enddate = moment($scope.row[3]).format('jYYYY/jMM/jDD');
    });

    fiscalyear.controller('fiscaltable', function ($scope, zdsSocket, toastr, $uibModal) {


        $scope.datepickerConfig = {
            dateFormat: 'jYYYY/jMM/jDD',
            gregorianDateFormat: 'YYYY-MM-DD',
            minDate: moment.utc('2014', 'YYYY'),
            allowFuture: true
        };

        $scope.openmodal = function (page, size, id=0) {
            if (id == 0)
                $scope.row = [];
            else
                $scope.row = id;
            $scope.new = id == 0;
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

        };

        $scope.getfiscalyears = function () {
            var msg = {
                type: "call",
                node: "AccountingRelay.query",
                data: {
                    'table': 'fiscalyear',
                    'columns': ['fiscalyearid', 'title', 'startdate', 'enddate', 'status']
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

        };

        $scope.getfiscalyears();


        $scope.doedit = function () {

            if ($scope.new)
                var msg = {
                    type: "call",
                    node: "AccountingRelay.newFiscalYear",
                    data: {userid: uid, title: $scope.row[1], start: $scope.row[7], end: $scope.row[8]}
                };
            else
                var msg = {
                    type: "call",
                    node: "AccountingRelay.modifyFiscalYear",
                    data: {userid: uid, id: $scope.row[0], title: $scope.row['1']}
                };
            zdsSocket.send(msg, function (data) {
                if (data["data"]["success"] == true) {
                    toastr.success($scope.new ? 'سال مالی ایجاد شد!' : 'سال مالی با موفقیت ویرایش شد!');
                    $scope.getfiscalyears();
                } else {
                    toastr.error('!', 'خطا!');
                }
            });

        }


    });

    fiscalyear.controller('removefiscalyear', function ($scope,zdsSocket,toastr,$uibModal) {

        $scope.doremove = function () {
                var msg = {
                    type: "call",
                    node: "AccountingRelay.removeFiscalYear",
                    data: {userid: uid, id: fyid}
                };
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        toastr.success('سال مالی حذف گردید!')
                    } else {
                        zdsSocket.raiseError("خطایی رخ داده است");
                        toastr.error('!', 'خطا!');
                    }
                });
        }
    });


    fiscalyear.filter('jalaliDate', function () {
        return function (inputDate, format) {
            var date = moment(inputDate);
            return date.format(format);
        }
    });
    fiscalyear.filter('pStatus', function () {
        return function (item) {
            if (!item) {
                return null
            } else {
                switch (item) {
                    case '1':
                        return "فعال";
                    case '2':
                        return "بسته شده";
                    default:
                        return item;
                }
            }
        }
    });
    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('accounting.fiscalyear', {
                url: '/fiscalyear',
                templateUrl: 'app/pages/accounting/fiscalyear/fiscalyear.html',
                title: 'سال مالی',
                sidebarMeta: {
                    order: 800
                }
            });
    }

})();
