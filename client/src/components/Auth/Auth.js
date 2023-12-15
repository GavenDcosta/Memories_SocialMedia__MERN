import React, {useEffect} from 'react'
import {Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { GoogleLogin } from 'react-google-login'

import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Icon from './Icon';
import useStyles from './styles'
import { useState } from 'react';
import Input from './Input';
import {signin, signup} from '../../actions/auth'

import { gapi } from 'gapi-script';

import {useDispatch} from 'react-redux'

const initialState= {firstName: "", lastName:"", email:"", password:"", confirmPassword:""}

const Auth = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '1060185394494-pcu8ph29mmr6e3ggr0kcrihmh2cq2abs.apps.googleusercontent.com',
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

 const classes = useStyles()

 const [showPassword, setShowPassword] = useState(false)
 const [isSignup, setIsSignup] = useState(true)
 const [formData, setFormData] = useState(initialState)

 const handleSubmit = (e) => {
  e.preventDefault()
  
  if(isSignup){
     dispatch(signup(formData, history))
  } else {
     dispatch(signin(formData, history))
  }
 }

 const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
 }

 const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

 const switchMode = () => setIsSignup((prevIsSignup) => !prevIsSignup)

 const googleSuccess = async (res) => {
  //?. => optional chaining operator .. wont throw error if we dont have access to the res object
    const result = res?.profileObj
    const token = res?.tokenId

    try {
      dispatch({type:'AUTH', data: {result, token}})
      history.push('/')
    } catch (error) {
      console.log(error)
    }
 }

 const googleFailure = (error) => {
  console.log('Google sign in was unsuccessful')
  console.log(error)
 }
 

  return (
    <Container component="main" maxWidth="xs">
       <Paper className={classes.paper} elevation={3}>
         <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
         </Avatar>
         <Typography variant='h5'>{isSignup ? "Signup" : "Sign in"}</Typography>
         <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {
                isSignup && (
                  <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                  </>
                )
              }
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
              {  isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>

            <GoogleLogin
              clientId='1060185394494-pcu8ph29mmr6e3ggr0kcrihmh2cq2abs.apps.googleusercontent.com'
              render={(renderProps) => (
                <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant='contained'>
                  Sign In using Google 
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy='single_host_origin'
            />
       
            <Grid container justify="center">
                 <Grid item>
                    <Button onClick={switchMode}>
                      {isSignup ? "Already have an Account ? Sign in" : "Don't have an Account ? Sign Up"}
                    </Button>
                 </Grid>
            </Grid>
         </form>
       </Paper>
    </Container>
  )
}

export default Auth