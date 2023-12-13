import express from 'express'

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'  //in react no need of .js but in node we have to

const router = express.Router()

router.get('/', getPosts)
router.post('/', createPost) 
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:id/likePost', likePost)


export default router