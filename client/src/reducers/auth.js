import {AUTH,LOGOUT} from '../constants/actionTypes';
// a reducer is a function that accepts the state and action. based on action type 
const auth = (state = {authData : null},action) =>{
    switch(action.type){
        case AUTH :
            localStorage.setItem ('profile',JSON.stringify({...action?.data}));
            return {...state,authData : action?.data};
        case LOGOUT :
            localStorage.clear();
            return {...state, authData: null}
        default:
            return state;

    }
}

export default auth;