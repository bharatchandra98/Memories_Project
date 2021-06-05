import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'; 
import memories from './images/memories.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import { getPosts } from './actions/posts';

const App = ()  => {
    const [currentId,setCurrentId] = useState(null);// for prop drilling using react 
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPosts());//calls the action
    },[currentId,dispatch]);

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">
                    Memories
                </Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                    {/* xs = 12 going to take full width on extra small devices */}
                    {/* sm = 7 in small or larger devices 7 out of 12 is take by app  */}
                        <Grid item xs={12} sm={7}>  
                            <Posts setCurrentId= {setCurrentId}/>
                        </Grid>
                        {/* sm = 4 in small or larger devices 4 out of 12 is take by app  */}
                        <Grid item xs={12} sm={4}>  
                            <Form currentId = {currentId} setCurrentId = {setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;