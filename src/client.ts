import * as net from 'net';

const client = net.createConnection({port: Number(process.env['PORT']) }, () => {
    console.log('connect');
    client.write('ping', (err) => {
        if (err) console.error(err);
    });
});

client.on('data', (data) => {
    if (data.toString() === 'pong') {
        console.log(data.toString());
        setTimeout(() => {
            client.write('ping', err => {
                if (err)
                    console.error(err);
            });
        }, 1000);
    }
});