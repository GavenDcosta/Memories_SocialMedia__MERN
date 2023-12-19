import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv';
 
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

dotenv.config();

//type: module in package.json to use import instead of require

const app = express();

app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))

app.use(cors({
  origin: 'https://gaven-memories-mern.netlify.app',
}));


app.use('/posts', postRoutes)
app.use('/user', userRoutes)


const CONNECTION_URL = process.env.CONNECTION_URL

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
  .catch((error) => console.log(error.message))
























