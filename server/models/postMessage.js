import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    creator: String,
    title: String,
    message: String,
    name: String,
    tags: [String],
    selectedFile: String,
    // likeCount: {
    //     type: Number,
    //     default: 0
    // },
    likes:{
        type : [String],
        default:[]
    },
    comments: {
        type: [String],
        default: []
    },
    createddAt:{
        type:Date,
        default: new Date()
    }
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage 