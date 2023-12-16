import * as api from '../api'
import {DELETE, CREATE, UPDATE, LIKE, FETCH_ALL} from '../constants/actionTypes'   //constants are always specified seperately to make error handeling easier

//Action Creators(functions wwhich return an action)

export const getPosts = () => async (dispatch) => {         // redux thunk
    try{
        const {data} = await api.fetchPosts()

        dispatch({ type:FETCH_ALL , payload: data})

    }catch(error){
        console.log(error)
    }
    
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data } = await api.fetchPostsBySearch(searchQuery)

        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post)

        dispatch({ type: CREATE, payload: data})
        
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