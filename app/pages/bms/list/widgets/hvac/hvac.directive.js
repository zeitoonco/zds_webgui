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
            var display = new SegmentDisplay("display");
            display.pattern         = "##";
            display.displayAngle    = 0;
            display.digitHeight     = 22.5;
            display.digitWidth      = 13;
            display.digitDistance   = 2.5;
            display.segmentWidth    = 2.4;
            display.segmentDistance = 0.5;
            display.segmentCount    = 7;
            display.cornerType      = 0;
            display.colorOn         = "#333";
            display.colorOff        = "#ccc";
            display.draw();
            display.setValue('16');
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