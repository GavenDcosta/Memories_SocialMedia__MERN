import express from 'express'

import { signin, signup } from '../controllers/user.js'  //in react no need of .js but in node we have to

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)

export default router