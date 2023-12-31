import React from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Chip } from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Form/Form';
import {getPosts, getPostsBySearch} from '../../actions/posts'
import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom';
import Pagination from '../Pagination';



import useStyles from './styles'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}


const Home = () => {

    const [currentId, setCurrentId] = useState(null)
    const [search, setSearch] = useState("")
    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState('');

    const classes = useStyles()

    const history = useHistory()
    const query = useQuery()

    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
  
    const dispatch = useDispatch()
  
    // useEffect(() => {
    //    dispatch(getPosts())
    // }, [currentId, dispatch])


    
    const searchPost = () => {
      if(search.trim() || tags){
        dispatch(getPostsBySearch({search, tags: tags.join(',') }))   //cannot pass an array in url parameters , so convert it to a string
        history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
      }else{
        history.push('/')
      }
    }
    
    const handleKeyPress = (e) => {
      if(e.keyCode === 13){               //key code 13 is the enter key
        searchPost() 
      }
    }


    // const handleAdd = (tag) => setTags([...tags, tag])

    const handleAdd = () => {
      if (newTag.trim() !== '') {
        setTags([...tags, newTag.trim()]);
        setNewTag('');
      }
    };

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))

    return (
      <Grow in>
          <Container maxWidth='xl'>
            <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={6} md={9}>
                <Posts setCurrentId={setCurrentId}/>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inherit">
                  <TextField 
                     name="search" 
                     variant="outlined" 
                     label="Search Memories" 
                     fullWidth
                     onKeyDown={handleKeyPress}
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                  />
                  <div>
                     {tags.map((tag, index) => (
                       <Chip
                         key={index}
                         label={tag}
                         onDelete={() => handleDelete(tag)}
                         style={{ margin: '4px' }}
                       />
                     ))}
                  </div>
                  <TextField
                    label="Search Tags(enter a tag and click enter)"
                    variant="outlined"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                    style={{ marginTop: '8px', marginBottom:'8px' }}
                  />
                  <Button variant="contained"  onClick={searchPost} className={classes.searchButton} color="primary" >Search</Button>
                </AppBar>
                <Form currentId={currentId} setCurrentId = {setCurrentId}/>
                {(!search && !tags.length) && (
                    <Paper  elevation={6}>
                      <Pagination page={page} />
                    </Paper>
                )}
              </Grid>
            </Grid>
          </Container>
      </Grow>
    )
}

export default Home