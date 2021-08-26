## Routing Definitions for the Orders Service

### GET ROUTES
#### /api/orders 
    -Retrieve all active orders for the given user making the request
#### /api/orders/:{id}
    -Get details about specific order
### POST ROUTES
#### /api/orders {ticketId: string}
    -Create an order to purchase the specified ticket
### DELETE ROUTES
#### /api/orders/:{id}
    -Cancel the order
