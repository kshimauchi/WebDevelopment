
const INTIAL_STATE = {
    isSignedIn: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state= INTIAL_STATE, action) => {
    
    switch(action.type){
        case 'SIGN_IN':
            return {...state, isSignedIn: true};
        case 'SIGN_OUT':
            return {...state, isSignedOut: false};
        default:
            return state;    
    }
};