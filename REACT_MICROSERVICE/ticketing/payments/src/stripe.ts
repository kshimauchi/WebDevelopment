import Stripe from 'stripe';

export const stripe = new Stripe(
    process.env.STRIPE_KEY!,{
    apiVersion: '2020-08-27',
});
//Since testing is run outside the kubectl
//cluster we would have to bring in the environment
//or we could create a mock object with the same
//stripe properties