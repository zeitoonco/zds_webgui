/**
 * Created by Pedram2 on 10/29/2016.
 */
angular.module('ZDSGUI.pages.bms.list').directive('zdsBmsHvac', function ($interval) {
    return {
        restrict: 'E',
        scope: {
            nodeId: '@'
        },
        templateUrl: 'app/pages/bms/list/widgets/hvac/hvac.html',
        link: function (scope, elem, attr) {
            String.prototype.reverse = function () {
                return this.split("").reverse().join("");
            };

            scope.fans = ['خاموش', 'کند', 'متوسط', 'تند'];
            scope.fanaction = function () {
                if (scope.fan > 2) scope.fan = 0;
                else scope.fan++;
            };
            scope.modes = ['گرمایش', 'سرمایش', 'فن'];
            scope.modeaction = function () {
                if (scope.mode > 1) scope.mode = 0;
                else scope.mode++;
            };

            scope.settemp = 23;
            scope.temp = '22';
            scope.fan = 0;
            scope.mode = 0;
            scope.vswing = false;
            scope.hswing = false;

            scope.options = {
                size: 2,
                align: 'left'
            };
            scope.time = 1;
            scope.Timer = $interval(function () {
                console.log("Timer Ticked. " + scope.time++);
                scope.temp = ('' + Math.floor((Math.random() * 10) + 20) + '').reverse();
            }, 2000);
            scope.$on('$destroy', function () {
                console.log("destroy");
                $interval.cancel(scope.Timer);
            });
        }
    };
});