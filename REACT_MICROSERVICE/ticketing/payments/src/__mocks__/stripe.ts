export const stripe = {
    charges: {
        create: jest.fn().mockResolvedValue({
            //inside the route we are awaiting a promise
        }),
    },
};