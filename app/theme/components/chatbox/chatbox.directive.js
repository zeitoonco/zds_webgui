(function () {
    'use strict';

    angular.module('ZDSGUI.theme.components')
        .directive('chatbox', chatbox);

    /** @ngInject */
    function chatbox() {
        return {
            restrict: 'E',
            templateUrl: 'app/theme/components/chatbox/chatbox.html'
        };
    }

})();/**
 * Created by asus iran on 12/24/2016.
 */
