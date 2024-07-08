import express from 'express'
import UserRouter from './userRoutes.js'
import apiRouter from './apiRoutes.js'
import postRouter from './postRoutes.js'


const router = express.Router()

router.use('/users',UserRouter)
router.use('/api',apiRouter)
router.use('/post' ,postRouter)


export default router;