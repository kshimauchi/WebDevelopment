import nats, {Stan} from 'node-nats-streaming';

class NatsWrapper {
    //(1) create nats client assign to class
    // maybe unassigned until we call the connect function
    private _client?: Stan;
    
    //(4) expose client
    get client() {
        if(!this._client){
            throw new Error('Cannot access NATS client before connection');
        }
        return this._client;
    }

    //(2) cluster id, client and other connection settings
    connect(clusterId: string, clientId: string, url: string) {
        this._client = nats.connect(clusterId, clientId, {url});

    //(3) since we are sticking with async await syntax
        return new Promise<void>( (resolve, reject) => {
        this.client!.on('connect',()=>{
            console.log('Connect to NATS!!!');
            resolve();
        });
        this.client!.on('error',(err) => {
            reject(err);
        });
    });
    }
}
export const natsWrapper = new NatsWrapper();
