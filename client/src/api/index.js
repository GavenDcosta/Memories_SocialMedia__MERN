import axios from 'axios'

// const API = axios.create({baseUrl: 'http://localhost:5000'})

const API = axios.create({baseUrl: 'https://gaven-socialmemories-api.vercel.app'})

//for middleware to work
API.interceptors.request.use((req) => {
   if(localStorage.getItem('profile')){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
   } 

   return req
})


export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts',newPost)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value })


export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)




// const url = 'http://localhost:5000/posts'

// export const fetchPosts = () => axios.get(url)
// export const createPost = (newPost) => axios.post(url,newPost)
// export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)
// export const deletePost = (id) => axios.delete(`${url}/${id}`)
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`)
