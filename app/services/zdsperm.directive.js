/**
 * Created by Pedram2 on 8/26/2016.
 */

angular.module('ZDSGUI.zdsperm', [])
    .directive('zdsperm', function ($rootScope) {
        return function (scope, element, attrs) {
            element.css('visibility', ($rootScope.$permissions.indexOf(attrs.zdsperm) != -1)
                ? 'visible' : 'hidden');
        }
    });