import React from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Form/Form';
import {getPosts, getPostsBySearch} from '../../actions/posts'
import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom';
import Pagination from '../Pagination';
import ChipInput from 'material-ui-chip-input'


import useStyles from './styles'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}


const Home = () => {

    const [currentId, setCurrentId] = useState(null)
    const [search, setSearch] = useState("")
    const [tags, setTags] = useState([])

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
        history.push(`/posts/search?searchQuery=${search || 'none'}$tags=${tags.join(',')}`)
      }else{
        history.push('/')
      }
    }
    
    const handleKeyPress = (e) => {
      if(e.keyCode === 13){               //key code 13 is the enter key
        searchPost() 
      }
    }


    const handleAdd = (tag) => setTags([...tags, tag])

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
                  <ChipInput 
                    style={{margin: '10px 0'}}
                    value={tags}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    variant="outlined"
                    label="Search Tags"
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