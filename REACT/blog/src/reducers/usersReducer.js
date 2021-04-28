/* eslint-disable import/no-anonymous-default-export */
//(1) creating a reducer for the users...
export default (state=[], action)=> {
    switch(action.type) {
        case 'FETCH_USER':
            return [...state, action.payload];
        default:
            return state;
    }
};