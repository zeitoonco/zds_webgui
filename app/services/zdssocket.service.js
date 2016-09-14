/**
 * Created by Pedram2 on 8/26/2016.
 */

angular.module('ZDSGUI.websocket', ['ngWebSocket'])
    .controller('error', function ($scope) {

    })
    .factory('zdsSocket', function ($websocket, $rootScope, $location, toastr) {
        var ws = $websocket('ws://138.201.152.83:5455/');
        //var ws = $websocket('ws://192.168.1.44:5455/');
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
            $rootScope.$logedin = true;
            $location.path("/dashboard");
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
            raiseError: function (msg) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/services/error.zds.html',
                    size: 'md',
                    resolve: {
                        msg: function () {
                            return msg;
                        }
                    }
                });
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
            }

        };
    });