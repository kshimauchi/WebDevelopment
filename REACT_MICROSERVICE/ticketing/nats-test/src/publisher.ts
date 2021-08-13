import nats from 'node-nats-streaming';

// (1) Simple port forwarding solution
// (2) nats-pod publish: npm run publish
const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

// library uses callbacks
stan.on('connect', () => {
    console.log('Publisher connected to NATS !!!!');

    //Share formatting is JSON
    const data = JSON.stringify({
        id: '001',
        title: 'concertTicket',
        price: 20
    });

    stan.publish('ticket: created', data, () => {
        console.log('Event published');
    });
});
