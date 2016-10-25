/**
 * Created by Pedram2 on 8/30/2016.
 */

/**
 * @author v.lugovsky
 * created on 21.12.2015
 */

(function () {
    'use strict';
    //var aid;
    var list = angular.module('ZDSGUI.pages.bms.list', ['ZDSGUI.boolean','ZDSGUI.pages.components.tree'])
        .config(routeConfig);

    list.controller('bms', function ($scope, zdsSocket, toastr, $uibModal) {

        $scope.value = '°22';
        $scope.options = {
            size: 4,
            align: 'left'

        };
    });
    list.controller('bms2', function ($scope, zdsSocket, toastr, $uibModal) {
        var tree = [];

        tree.push({'id': 1, 'parent': '#', 'text': "ساختمان ها", 'state': {'opened': true}});
        tree.push({'id': 2, 'parent': 1, 'text': "طبقه اول", 'state': {'opened': true}});
        tree.push({'id': 3, 'parent': 1, 'text': "ورودی", 'state': {'opened': true}});
        tree.push({'id': 4, 'parent': 1, 'text': "راه رو", 'state': {'opened': true}});
        tree.push({'id': 5, 'parent': 2, 'text': "اتاق اول", 'state': {'opened': true}});
        tree.push({'id': 6, 'parent': 2, 'text': "اتاق دو", 'state': {'opened': true}});
        tree.push({'id': 7, 'parent': 4, 'text': "پذیرش", 'state': {'opened': true}});
        $scope.basicConfig = {

            core: {
                multiple: false,
                check_callback: true,
                worker: true,
                "rtl": true
            },
            'types': {
                'folder': {
                    'icon': 'ion-ios-folder'
                },
                'default': {
                    'icon': 'ion-document-text'
                }
            },
            'plugins': ['types'],
            'version': 1
        };

        console.log(JSON.stringify(tree));
        $scope.bmstree = tree;
        $scope.ignoreChanges = true;
        //newId = 0;
        $scope.treeData = $scope.bmstree;
        $scope.basicConfig.version++;
    });
    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('bms.list', {
                url: '/bms/list',
                templateUrl: 'app/pages/bms/list/list.html',
                permission: 'AccountingRelay',
                title: 'مناطق',
                sidebarMeta: {
                    order: 101
                }
            });
    }

})();
