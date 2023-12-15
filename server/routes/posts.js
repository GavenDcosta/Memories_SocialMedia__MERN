import express from 'express'

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'  //in react no need of .js but in node we have to

import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', getPosts)
router.post('/', auth,  createPost)    //auth will check if someone is logged in and only then createPost will execute
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth,  deletePost)
router.patch('/:id/likePost', auth, likePost)

export default router