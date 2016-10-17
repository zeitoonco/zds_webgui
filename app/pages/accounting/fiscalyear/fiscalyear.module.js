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
        $scope.$on('modal.closing', function (event, reason, closed) {
            $scope.getfiscalyears();
        });

        $scope.datepickerConfig = {
            dateFormat: 'jYYYY/jMM/jDD',
            gregorianDateFormat: 'YYYY-MM-DD',
            minDate: moment.utc('2014', 'YYYY'),
            allowFuture: true
        };

        $scope.openmodal = function (page, size, id,t,sd,ed) {
            fyid = id;
            $scope.title = t;
            $scope.startdate = moment(sd).format('jYYYY/jMM/jDD');
            $scope.enddate = moment(ed).format('jYYYY/jMM/jDD');
            //$scope.new = id == 0;
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
                    'columns': ['fiscalyearid', 'title', 'startdate', 'enddate', 'status'],
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

        };
        $scope.getfiscalyears();
    });

    fiscalyear.controller('newfiscalyear', function ($scope,zdsSocket,toastr) {
        $scope.$on('modal.closing', function (event, reason, closed) {
            $scope.getfiscalyears();
        });
        $scope.addfiscalyear = function () {
           var msg = {
               type: "call",
               node: "AccountingRelay.newFiscalYear",
               data: {userid: uid, title: $scope.title,start: $scope.fstartdate,end: $scope.fenddate}
           };
           console.log(JSON.stringify(msg));
           zdsSocket.send(msg, function (data) {
               if (data["data"]["success"] == true) {
                   toastr.success('اطلاعات با موفقیت اعمال شد!');

               } else {
                   toastr.error('!', 'خطا!');
               }
           });
       }
    });


    fiscalyear.controller('editfiscalyear', function ($scope,zdsSocket,toastr) {
        $scope.$on('modal.closing', function (event, reason, closed) {
            $scope.getfiscalyears();
        });
        $scope.modifyfiscalyear = function () {
                var msg = {
                    type: "call",
                    node: "AccountingRelay.modifyFiscalYear",
                    data: {userid: uid, id: fyid, title: $scope.title}
                };
            zdsSocket.send(msg, function (data) {
                if (data["data"]["success"] == true) {
                    toastr.success('اطلاعات با موفقیت اعمال شد!');

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
                permission: 'AccountingRelay.newFiscalYear',
                sidebarMeta: {
                    order: 800
                }
            });
    }

})();
