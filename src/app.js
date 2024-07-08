import express from 'express'
import compression from 'compression'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes/routes.js'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(compression())
app.use('/uploads', express.static('uploads'))
app.use(cors({
  origin: 'https://metroblog-frontend.vercel.app',
  credentials: true
}))

app.use('/', router)
app.get('/', (req, res) => res.send('Welcome to Metro Blogs'))
export default app
