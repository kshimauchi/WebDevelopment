import Queue from 'bull';

interface Payload {
    orderId: string;
}

//bucket
const expirationQueue = new Queue<Payload>('order:expiration', {
    redis: {
        host: process.env.REDIS_HOST,
        //optional interface for information we are string
        
    },
});
//We will implement a better event here once we get a better publisher put together
expirationQueue.process(async (job)=>{
    console.log('I want to publish an expiration: completed event for orderId',
    job.data.orderId
    );
});
export {expirationQueue };