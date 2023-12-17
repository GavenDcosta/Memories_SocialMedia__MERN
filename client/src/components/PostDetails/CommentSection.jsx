import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import useStyles from './styles'
import {commentPost} from '../../actions/posts'

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const classes = useStyles()
  const dispatch = useDispatch()
  const commentsRef = useRef()

  const [comments, setComments] = useState(post?.comments)
  const [comment, setComment] = useState('')

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`
    const newComments = await dispatch(commentPost(finalComment, post._id))
    
    setComments(newComments)
    setComment('')

    commentsRef.current.scrollIntoView({behavious:'smooth'})
  }
 

  return (
    <div>
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterbottom variant="h6">Comments</Typography>
                
                {comments.map((c, index) => (
                     <div style={{ width: '100%' }} key={index}>
                             <Typography gutterbottom variant="subtitle1">
                                 <strong>{c.split(': ')[0]}</strong>
                                 {c.split(': ')[1]}
                             </Typography>
                     </div>
                ))}
                <div ref={commentsRef} />

            </div>

            {user?.result?.name ? (
               <div style={{width:'70%'}}>
                 <Typography gutterbottom variant="h6">Write a Comment</Typography>
                 <TextField 
                   fullWidth
                   rows={4}
                   variant="outlined"
                   label="Comment"
                   value={comment}
                   onChange={((e) => setComment(e.target.value))}
                 />
                 <Button style={{marginTop: '10px'}} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick} >
                    Comment 
                 </Button>
               </div>
               ) : (
                <Typography gutterbottom variant="h6">Sign in to add a Comment</Typography>
               )}
        </div>
    </div>
  )
}

export default CommentSection