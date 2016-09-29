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
                case 't':
                case true:
                    return "بله";
                case 'false':
                case 'f':
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
}).filter('accounttype', function () {
    return function (item) {
        if (!item) {
            return null
        } else {
            switch (item) {
                case '0':
                case 0:
                    return "سرشاخه";
                case '1':
                case 1:
                    return "گروه";
                case '2':
                case 2:
                    return "کل";
                case '3':
                case 3:
                    return "معین";
                default:
                    return item;
            }
        }
    }
});