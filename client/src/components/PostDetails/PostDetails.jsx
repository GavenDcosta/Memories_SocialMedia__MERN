import React, {useEffect} from 'react'
import {Paper, Typography, CircularProgress, Divider} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import useStyles from './styles'
import {getPost, getPostsBySearch} from '../../actions/posts'
import CommentSection from './CommentSection'


const PostDetails = () => {

  const { post, posts, isLoading } = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()

  const { id } = useParams()

  useEffect(() => {
    dispatch(getPost(id))
  }, [id])

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post])


  const openPost = (_id) => {
    history.push(`/posts/${_id}`)
  }


  //add checks to avoid getting undefined error 

  if(!post) return null

  if(isLoading){     
    return (
      <Paper className={classes.loadingPaper} elevation={6}>
          <CircularProgress size="7em" />
      </Paper>
    )
  }


  const recommendedPosts = posts && posts.filter(({ _id }) => _id !== post._id)
  
  return (
    <Paper style={{padding: '20px', borderRadius: '15px'}} elevation={6} >
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createddAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      
      {recommendedPosts.length > 0 && (
        <div className={classes.section}>
           <Typography gutterBottom variant="h5">You might also like</Typography>
           <Divider/>
           <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, message, name, likes = [], selectedFile, _id }) => (
              <div style={{margin:'20px', cursor:"pointer"}} onClick={() => openPost(_id)} key={_id}>
                <img src={selectedFile} width='200px' />
                <Typography gutterBottom variant="h6" >{title}</Typography>
                <Typography gutterBottom variant="subtitle2" >{name}</Typography>
                <Typography gutterBottom variant="subtitle2" >{message}</Typography>
                <Typography gutterBottom variant="subtitle1" >Likes: {likes.length}</Typography>
              </div>
            ))}
           </div>
        </div>
      )}

    </Paper> 
  )
}

export default PostDetails