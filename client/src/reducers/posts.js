import {DELETE, CREATE, UPDATE, LIKE, FETCH_ALL, FETCH_BY_SEARCH} from '../constants/actionTypes'   //constants are always specified seperately to make error handeling easier


export default (state = [], action) => {
   switch (action.type){
    case FETCH_ALL:
        //return action.payload
        return {
            ...state,
            posts: action.payload.data,
            currentPage: action.payload.currentPage, 
            numberOfPages: action.payload.numberOfPages
        }
    case CREATE:
        return [...state, action.payload]
    case UPDATE:
    case LIKE:    
        return state.map((post) => post._id == action.payload._id ? action.payload : post)   
    case DELETE:
        return  state.filter((post) => post._id != action.payload)           
    case FETCH_BY_SEARCH:
        return { ...state, posts: action.payload}    
    default:
        return state       
   }
}



