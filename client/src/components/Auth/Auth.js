import React, { useState } from 'react';
import { Grid, Paper, Avatar, Button, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import Input from './Input';
import Icon from './icon';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { signin,signup } from '../../actions/auth';
import useStyles from './styles';

const initialState = {
    firstName : '',
    lastName :'',
    email:'',
    password:'',
    confirmPassword:''
}

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData,setFormData] = useState(initialState);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(isSignup){
            dispatch(signup(formData,history))
        }
        else{
            dispatch(signin(formData,history))
        }
    }

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async(res) =>{
        const result = res?.profileObj; // if res.profileObj doesn't exists result = undefined
        const token = res?.tokenId;

        try{
            dispatch({type: 'AUTH', data : {result,token}});
            history.push("/");
        }
        catch(e){
            console.log(e);
        }
    }

    const googleFailure = () =>{
        console.log("Google signin was unsuccessful! Try again later")
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.Avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            </Paper>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid spacing={2} container>
                    {
                        isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    {
                        isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />

                    }
                </Grid>
                
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>

                <GoogleLogin
                    clientId="787669414027-r4trrt5lv618pfnt7kktele63iujttqk.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">GOOGLE SIGN IN</Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />

                <Grid container justify="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'ALready have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default Auth;