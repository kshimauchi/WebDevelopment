//next- has serveral ways to set up environment variables
//most of which use specific syntax for exposing different environments
//prefix the key with PUBLIC_NEXT_: if you would like to expose this data to the browser
//This is not currently in use,I am using direct framework to pass the data to the [orderId].js file
//[] is for wild card routes using next
export async function getServerSideProps() {
    return  process.env.STRIPE_KEY_PK;
}