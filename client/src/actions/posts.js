import * as api from '../api'
import {DELETE, CREATE, UPDATE, LIKE, FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, END_LOADING} from '../constants/actionTypes'   //constants are always specified seperately to make error handeling easier

//Action Creators(functions wwhich return an action)

export const getPosts = (page) => async (dispatch) => {         // redux thunk
    try{
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPosts(page)

        dispatch({ type:FETCH_ALL , payload: data})
        dispatch({type:END_LOADING})

    }catch(error){
        console.log(error)
    }
    
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery)
        
        dispatch({ type:FETCH_BY_SEARCH , payload: data})
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const { data } = await api.createPost(post)

        dispatch({ type: CREATE, payload: data})
        dispatch({type: END_LOADING})
        
    } catch (error) {
        console.log(error)
    }
}



export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post)

        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)

        dispatch({type: DELETE, payload:id})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id)

        dispatch({type: LIKE, payload: data})
    } catch (error) {
        console.log(error)
    }
}