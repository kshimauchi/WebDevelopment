import { Message, Stan } from 'node-nats-streaming';


export abstract class Listener {
   
  abstract subject: string;
  abstract queueuGroupName: string;
  private client: Stan;
  protected awkWait = 5 * 1000;
  abstract onMessage(data: any, msg: Message): void;
    
  constructor(client: Stan) {
    this.client = client;
  }
 
  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.awkWait)
      .setDurableName(this.queueuGroupName);
    }
    
    listen() {
        
        const subscription = this.client.subscribe(
            this.subject,
            this.queueuGroupName,
            this.subscriptionOptions()
        );
    
      subscription.on('message', (msg: Message) => {
      
        console.log(`Message Received: ${this.subject} / ${this.queueuGroupName}`);
      
        const parsedData = this.parseMessage(msg);
      
        this.onMessage(parsedData, msg);
    });
  }
    parseMessage(msg: Message) {
        const data = msg.getData();
        
        return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'));
    }
    
}
