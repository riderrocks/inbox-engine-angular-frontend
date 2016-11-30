var SocketIoService = app.service('SocketIoService', ['$rootScope','CONFIG',function ($rootScope,CONFIG) {
    var socket = io(CONFIG.INBOX.socketUrl, {transports: ['polling'], path: '/socket-io/socket.io'});
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
}]);