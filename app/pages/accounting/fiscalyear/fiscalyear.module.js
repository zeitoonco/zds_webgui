/**
 * Created by Pedram2 on 8/30/2016.
 */

/**
 * @author v.lugovsky
 * created on 21.12.2015
 */
(function () {
    'use strict';

    var fiscalyear = angular.module('ZDSGUI.pages.accounting.fiscalyear', [
        'ZDSGUI.boolean', 'ngJalaliFlatDatepicker'])
        .config(routeConfig);
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

    fiscalyear.controller('editfiscal', function ($scope) {
        $scope.startdate = moment($scope.row[2]).format('jYYYY/jMM/jDD');
        $scope.enddate = moment($scope.row[3]).format('jYYYY/jMM/jDD');
    });

    fiscalyear.controller('fiscaltable', function ($scope, zdsSocket, toastr, $uibModal) {


        $scope.datepickerConfig = {
            dateFormat: 'jYYYY/jMM/jDD',
            gregorianDateFormat: 'YYYY-DD-MM',
            minDate: moment.utc('2014', 'YYYY'),
            allowFuture: true
        };

        $scope.openmodal = function (page, size, id) {
            $scope.row = id;
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
