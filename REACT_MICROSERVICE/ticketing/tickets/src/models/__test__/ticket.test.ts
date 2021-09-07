import {Ticket} from '../ticket';

it('implements optimistic concurrency control', async()=>{
// Create an instance of a ticket
// Save the ticket to the database
// make two seperate changes to the tickets we fetched
// save the first fetched ticket
// save the second fetched ticket
// save the second fetched ticket and expect an error

    const ticket = Ticket.build({
        title: 'concert',
        price: 5,
        userId: '123'
    });
    await ticket.save();

    const firstInstance = await Ticket.findById( ticket.id );
    const secondInstance = await Ticket.findById( ticket.id );

    firstInstance!.set({ price:10 });
    secondInstance!.set({ price: 14 });

    await firstInstance!.save();
    // try { does not work to well in jest
    //     expect(async()=>{
    //         await secondInstance!.save();
    //     }).toThrow();
       
    // }catch(err){
    //     return;
    // }
   // save the second fetched ticket and expect an error
   try {
        await secondInstance!.save();
  } catch (err) {
    
    return;
  }
 
    //fail
    throw new Error('Should not reach this point!');
});

it('increments the version number on multiple saves', async()=>{
    
    const ticket = Ticket.build({
        title: 'concert',
        price:20,
        userId: '123'
    });
    
    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save();
    expect(ticket.version).toEqual(2);
});

