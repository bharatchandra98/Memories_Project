import * as api from '../api';
import { FETCH_ALL,CREATE,UPDATE,DELETE} from '../constants/actionTypes';


// Action creators --> functions that return the actions
export const getPosts = () => async(dispatch) => { //redux thunk - since we have to deal with async logic we have to add async inside anothter funtion  i.e function returning function 
    try{
        // {} --> destructures the data
        const { data } = await api.fetchPosts();
        // we are getting response from API where we have data in the response object. so we are destructuring the data
        
        //const action = { type : 'FETCH_ALL',payload : []} //payload is the data where we store all of our posts 
        dispatch({type : FETCH_ALL,payload : data}); // instead of returning action we have to dispatch it
    }
    catch(error){
            console.log(error.message)
    }
}

export const createPost = (post) => async(dispatch) =>{
    try{
        const {data} = await api.createPost(post);
        console.log(data);
        dispatch({type:CREATE,payload: data});
    }
    catch(error){
        console.log(error); 
    }
}

export const updatePost = (id,post) => async(dispatch) =>{
    try{
        const {data} = await api.updatePost(id,post);
        dispatch({type:UPDATE,payload: data});
    }
    catch(err){
        console.log(err);
    }
} 

export const deletePost = (id) => async(dispatch) =>{
    try{
        await api.deletePost(id);
        dispatch({type:DELETE, payload: id })
    }
    catch(err){
        console.log(err);
    }
}

export const likePost = (id) => async(dispatch) =>{
    try{
        const { data } = await api.likePost(id);
        dispatch({type:UPDATE,payload: data});
    }
    catch(err){
        console.log(err);
    }
}