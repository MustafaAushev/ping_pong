import * as http from 'http';
const server = http.createServer();

server.on('upgrade', (req, socket) => {
    console.log('upgrade');
    if (req.headers['upgrade'] !== 'websocket') {
        socket.end('HTTP/1.1 400 Bad Request');
        return;
    }
    const responseHeaders = [ 'HTTP/1.1 101 Web Socket Protocol Handshake', 'Upgrade: WebSocket', 'Connection: Upgrade']; 
    socket.write(responseHeaders.join('\r\n') + '\r\n\r\n');
    socket.pipe(socket);
});

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

server.listen(process.env['PORT'], () => {
    console.log(server.address())
});