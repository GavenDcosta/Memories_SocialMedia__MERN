import React, {useState} from 'react'

import useStyles from './styles'

import {Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import moment from 'moment'  //gives us => 5mins ago, 1hour ago etc..based on the date 

import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'

const Post = ({post, setCurrentId}) => {
    
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const [likes, setLikes] = useState(post?.likes)

    const user = JSON.parse(localStorage.getItem('profile'))


    const Likes = () => {
        if (post?.likes?.length > 0) {
          return likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

      const hasLikedPost = likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
      const userId = user?.result.googleId || user?.result?._id 

      const openPost = () => {
          history.push(`/posts/${post._id}`)
      }


      const handleLike = async () => {
        dispatch(likePost(post._id))

        if(hasLikedPost) {      //to reduce the time for likes to be shown
            setLikes(likes.filter((id) => id !== (user?.result.googleId || user?.result?._id )))
        }else{
            setLikes((prevLikes) => [...prevLikes, userId])
      }
    }
    
      
    return(
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase
              className={classes.cardAction}
              onClick={openPost}
            >
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createddAt).fromNow()}</Typography>
            </div>

            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                   <Button style={{color:'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                       <MoreHorizIcon fontSize="default"/>
                   </Button>
               </div>      
            )}

            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant='h5'>{post.title}</Typography>
            <CardContent>
                <Typography variant='body2' component='p' color='textSecondary'>{post.message}</Typography>
            </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardAction}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => 
                        {
                            if(window.confirm("Are you Sure?")){
                                dispatch(deletePost(post._id))
                            }
                            else{
                                alert("Deletion Cancelled")
                            }
                        }}
                    >
                    <DeleteIcon style={{color:"red"}} fontSize="small"/>
                </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post