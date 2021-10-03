import Queue from 'bull';
// we will create some queue jobs
// and send to redis server
// job: Type String description to nats-streaming server
// we will temporarily store this in redis server
// we will process these jobs and emit events like expiration complete
/* 

job: {
    orderId: string
}
**/

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