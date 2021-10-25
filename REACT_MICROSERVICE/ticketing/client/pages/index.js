import Link from 'next/link';

const LandingPage = ({ currentUser , tickets}) => {
   //console.log(tickets); 
  //Will think of a way to generate table with some filters
  
  //Wild Card Link route (href and as) next link
  const ticketList = tickets.map((ticket) => {
    return(
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a>View</a>
          </Link>
        </td>
      </tr>
    );
  });
  return (
  <div>
    <h1>Tickets</h1> 
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        {ticketList}
      </tbody>
    </table>
  </div>
  )
};
// Refactoring 
LandingPage.getInitialProps = async (context, client, currentUser) => {
  //axios will return a data object 
  const { data} = await client.get('/api/tickets');
  //This will be merged into props
  return {tickets: data}
  
};

export default LandingPage;
/* 
const client = buildClient(context);
const { data } = await client.get('/api/users/currentuser');
return data;


  return (
    currentUser ? <h1>You are signed in</h1> 
      : <h1>You are not signed in</h1>
  );
*/