import {DELETE, CREATE, UPDATE, LIKE, FETCH_ALL} from '../constants/actionTypes'   //constants are always specified seperately to make error handeling easier


export default (posts = [], action) => {
   switch (action.type){
    case FETCH_ALL:
        return action.payload
    case CREATE:
        return [...posts, action.payload]
    case UPDATE:
    case LIKE:    
        return posts.map((post) => post._id == action.payload._id ? action.payload : post)   
    case DELETE:
        return  posts.filter((post) => post._id != action.payload)            
    default:
        return posts        
   }
}



