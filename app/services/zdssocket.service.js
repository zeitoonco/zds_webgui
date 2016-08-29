/**
 * Created by Pedram2 on 8/26/2016.
 */

angular.module('ZDSGUI.websocket', ['ngWebSocket'])
    .factory('zdsSocket', function ($websocket) {
        var ws = $websocket('ws://138.201.152.83:5455/');
        var collection = [];

        ws.onMessage(function (event) {
            console.log('message: ', event);
            var res;
            try {
                res = JSON.parse(event.data);
            } catch (e) {
                res = {};
            }
            collection.push(res);
        });

        ws.onError(function (event) {
            console.log('connection Error', event);
        });

        ws.onClose(function (event) {
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
            send: function (message) {
                if (angular.isString(message)) {
                    ws.send(message);
                }
                else if (angular.isObject(message)) {
                    ws.send(JSON.stringify(message));
                }
            }

        };
    });