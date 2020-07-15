import * as net from 'net';
const server = net.createServer();

server.on('connection', (socket) => {
    console.log('connect');
    socket.on('data', (data) => {
        if (data.toString() === 'ping') {
            console.log(data.toString());
            setTimeout(() => {
                socket.write('pong', err => {
                    if (err)
                        console.error(err);
                });
            }, 1000);
        }
    });
});

server.on('error', (err) => {
    console.error(err);
});

server.listen({port: process.env['PORT']}, () => {
    console.log('listening on', server.address());
});