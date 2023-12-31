import express from 'express'

import { getPostsBySearch, commentPost,  getPost, getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'  //in react no need of .js but in node we have to

import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/search', getPostsBySearch)
router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', auth,  createPost)    //auth will check if someone is logged in and only then createPost will execute
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth,  deletePost)
router.patch('/:id/likePost', auth, likePost)
router.post('/:id/commentPost', auth, commentPost)

export default router