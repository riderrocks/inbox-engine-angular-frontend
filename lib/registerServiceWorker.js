if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    navigator.serviceWorker.register('sw.js').then(function(reg) {
        console.log(':^)', reg);
        reg.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function(sub) {
            $('#p2').show();
            console.log(sub.endpoint);
            var dat = sub.endpoint;
            var endpointParts = dat.split('/');
            var registrationId = endpointParts[endpointParts.length - 1];
            localStorage.setItem("registrationId", registrationId);
            $("#registrationId").html("Hello User! Your registrationId is: " + registrationId);
            $.ajax({
                type: "POST",
                url: "conn.php",
                data: {
                    "id": registrationId
                },
                success: function(data) {
                    console.log('Response from Server: ' + data);

                    $('#toggle').html('<h3>Thank you for subscribing to Desktop alerts</h3>');
                }
            });

        });
    }).catch(function(error) {
        console.log(':^(', error);
    });
} else {
    console.log('Service Worker is not supported');
}
