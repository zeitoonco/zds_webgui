/**
 * Created by Pedram2 on 10/29/2016.
 */
angular.module('ZDSGUI.pages.bms.list').directive('zdsBmsHvac', function () {
    return {
        restrict: 'E',
        scope: {
            nodeId: '@'
        },
        templateUrl: 'app/pages/bms/list/widgets/hvac/hvac.html',
        link: function (scope, elem, attr) {
            scope.settemp = 23;
            scope.value = '22';
            scope.options = {
                size: 2,
                align: 'left'

            };
        }
    };
});