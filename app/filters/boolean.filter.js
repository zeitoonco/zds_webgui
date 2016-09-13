/**
 * Created by Pedram2 on 8/26/2016.
 */

angular.module('ZDSGUI.boolean', []).filter('persianboolean', function () {
    return function (item) {
        if (!item) {
            return null
        } else {
            switch (item) {
                case 'true':
                case true:
                    return "بله";
                case 'false':
                case false:
                    return "خیر";
                default:
                    return "نا مشخص";
            }
        }
    }
}).filter('persiannull', function () {
    return function (item) {
        if (!item) {
            return null
        } else {
            switch (item) {
                case 'null':
                    return "نا مشخص";
                default:
                    return item;
            }
        }
    }
});