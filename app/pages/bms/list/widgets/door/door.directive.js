/**
 * Created by Pedram2 on 10/29/2016.
 */
angular.module('ZDSGUI.pages.bms.list').directive('zdsBmsDoor', function () {
    return {
        restrict: 'E',
        scope: {
            nodeId: '@'
        },
        templateUrl: 'app/pages/bms/list/widgets/door/door.html'
    };
});