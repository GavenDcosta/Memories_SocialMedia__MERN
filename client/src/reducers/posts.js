import {DELETE, CREATE, UPDATE, LIKE, FETCH_ALL, FETCH_BY_SEARCH, END_LOADING, START_LOADING} from '../constants/actionTypes'   //constants are always specified seperately to make error handeling easier


export default (state = [{ isLoading: true, posts: [] }], action) => {
   switch (action.type){
    case START_LOADING:
        return { ...state, isLoading: true }
    case END_LOADING:
        return { ...state, isLoading: false }    
    case FETCH_ALL:
        //return action.payload
        return {
            ...state,
            posts: action.payload.data,
            currentPage: action.payload.currentPage, 
            numberOfPages: action.payload.numberOfPages
        }
    case CREATE:
        return { ...state , posts: [...state.posts, action.payload] } 
    case UPDATE:
    case LIKE:    
        return { ...state, posts: state.posts.map((post) => post._id == action.payload._id ? action.payload : post)  }   
    case DELETE:
        return  { ...state, posts: state.posts.filter((post) => post._id != action.payload) }            
    case FETCH_BY_SEARCH:
        return { ...state, posts: action.payload}    
    default:
        return state       
   }
}



