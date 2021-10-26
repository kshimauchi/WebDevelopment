//next- has serveral ways to set up environment variables
//most of which use specific syntax for exposing different environments
export async function getServerSideProps() {
    return  process.env.NEXT_PUBLIC_STRIPE_KEY_PK;
}