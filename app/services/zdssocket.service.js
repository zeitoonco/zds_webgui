/**
 * Created by Pedram2 on 8/26/2016.
 */

angular.module('ZDSGUI.websocket', ['ngWebSocket'])
    .factory('zdsSocket', function ($websocket, $rootScope, $location) {
        var ws = $websocket('ws://138.201.152.83:5455/');
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
                var msg = {
                    type: "call",
                    node: node,
                    id: parseInt(Math.random() * 10000),
                    data: data
                };
                if (typeof callback === 'function') {
                    callbacks[msg.id] = callback;
                }
                ws.send(JSON.stringify(msg));
                send(msg, callback);
            }

        };
    });