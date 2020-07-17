import * as http from 'http';

const options = {
    port: Number(process.env['PORT']),
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket'
    }
};

const req = http.request(options);

req.end();

req.on('upgrade', (_res, socket) => {
    console.log('upgraded');
    socket.on('data', (data) => {
        if (data.toString() === 'pong') {
            console.log(data.toString());
            setTimeout(() => {
                socket.write('ping', err => {
                    if (err)
                        console.error(err);
                });
            }, 1000);
        }
    });
    socket.on('error', err => {
        console.error(err);
    });
    socket.write('ping', err => {
        if (err) console.error(err);
    });
});