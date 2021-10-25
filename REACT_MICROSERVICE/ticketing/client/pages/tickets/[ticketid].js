
//Wild Card Route
const TicketShow = ({ticket})=>{
    return ( <div> 
        <h1>TicketShow</h1>
            <h1>{ticket.title}</h1>
            <h4>Price: {ticket.price}</h4>
            <button className="btn btn-primary">Purchase</button>
        </div>
    );
};
TicketShow.getInitialProps = async (context, client)=>{
    const { ticketId }= context.query;

    const {data} = await client.get(`/api/tickets/${ticketId}`);
    //destructures out the ticket information
    return {ticket: data};
};
export default TicketShow;