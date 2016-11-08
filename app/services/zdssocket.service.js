/**
 * Created by Pedram2 on 8/26/2016.
 */

angular.module('ZDSGUI.websocket', ['ngWebSocket','ui.bootstrap'])
    .controller('error', function ($uibModalInstance, items) {
        var vm = this;
        vm.content = items;
    })
    .factory('zdsSocket', function ($websocket, $rootScope, $location, toastr, $uibModal) {
        var ws = $websocket('ws://192.168.1.20:5455/');
        //var ws = $websocket('ws://138.201.152.83:5455/');
        var collection = [];
        var callbacks = [];

        ws.onMessage(function (event) {
            console.log('message: ', event);
            var res;
            try {
                res = JSON.parse(event.data);
                if (res.id in callbacks) {
                    callbacks[res.id](res);
                }
            } catch (e) {
                res = {};
            }

            collection.push(res);
        });

        ws.onError(function (event) {
            console.log('connection Error', event);
        });

        ws.onClose(function (event) {
            $rootScope.$logedin = false;
            $location.path("/login");
            console.log('connection closed', event);
        });

        ws.onOpen(function () {
            console.log('connection open');
        });
        return {
            collection: collection,
            status: function () {
                return ws.readyState;
            },
            send: function (message, callback) {
                if (ws.readyState != 1) {
                    toastr.error('اتصال با وبسوکت برقرار نیست.', 'خطا!');
                    $rootScope.$logedin = false;
                    $location.path("/login");
                    return;
                }
                if (angular.isString(message)) {
                    ws.send(message);
                }
                else if (angular.isObject(message)) {
                    message.id = parseInt(Math.random() * 10000);
                    if (typeof callback === 'function') {
                        callbacks[message.id] = callback;
                    }
                    ws.send(JSON.stringify(message));
                }
            },
            call: function (node, data, callback) {
                var message = {
                    type: "call",
                    node: node,
                    data: data
                };
                if (angular.isString(message)) {
                    ws.send(message);
                }
                else if (angular.isObject(message)) {
                    message.id = parseInt(Math.random() * 10000);
                    if (typeof callback === 'function') {
                        callbacks[message.id] = callback;
                    }
                    ws.send(JSON.stringify(message));
                }
            },
            error: function (title, body, code = 0) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/services/error.zds.html',
                    size: 'md',
                    controller: 'error',
                    controllerAs: 'vm',
                    resolve: {
                        items: function () {
                            return {
                                title: title,
                                body: body,
                                code: code,
                            };
                        }
                    }
                });

            }


        };
    });