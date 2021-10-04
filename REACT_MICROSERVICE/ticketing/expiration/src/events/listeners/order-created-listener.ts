import { Listener , OrderCreatedEvent, Subjects } from '@ticket-share/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expiration-queue';


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {

    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message){

        //Timeout - currentTime
        const delay = new Date(data.expiresAt).getTime()- new Date().getTime();
        
        console.log('Waiting this many millisceonds to process the job:',delay);
        
        await expirationQueue.add(
        {
            orderId: data.id,
        },
        {
            //in milliseconds: we should see the message published
            //on expiration, you may adjust the time insde the 
            //order service/new routes variable EXPIRATION_WINDOW_SECONDS = 15*60;
            delay,
        });
        msg.ack();
    }
}
/* response on   https://ticketing.dev/api/orders
all one needs to do is auth, signin, create a ticket, 
get the tikcet id, then on the orders events 
need to post the endpoint with ticketId
{
    "status": "created",
    "userId": "615a4c698b037f0024c7a396",
    "expiresAt": "2021-10-04T00:53:43.665Z",
    "ticket": {
        "title": "New Concert",
        "price": 500,
        "version": 0,
        "id": "615a4c90ecde080026001f19"
    },
    "version": 0,
    "id": "615a4d13acd0200024ead846"
}
*/