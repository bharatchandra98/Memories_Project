import React,{ useState,useEffect } from 'react';
import { Container, Grow, Grid} from '@material-ui/core'; 
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import useStyles from '../../styles';


const Home = ()=>{
    const [currentId,setCurrentId] = useState(null);// for prop drilling using react 
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPosts());//calls the action
    },[currentId,dispatch]);


    return(
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
    )
}

export default Home;