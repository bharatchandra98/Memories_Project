import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Button, Paper, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import { createPost,updatePost } from '../../actions/posts';
// import { useSelector } from 'react-redux';

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        title: '', message: '', tags: '', selectedFile: ''
    });
    const post = useSelector((state)=> currentId ? state.posts.find((p)=>p._id == currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(()=>{
        if(post) setPostData(post);
    },[post])// this will run when post variable got changed

    const handleSubmit = (e) => {
        e.preventDefault();
        //if we have already existing _id we should not dispatch current id
        if(currentId){
            dispatch(updatePost(currentId,{...postData,name:user?.result?.name}));
        }
        else{
        dispatch(createPost({...postData,name : user?.result?.name}));
        }
         clear(); //doesnot require since our page is page is getting refreshed on submit 
    }


    //Get Current ID ;- to get current id the parent item has to get the currentid and pass the value to its children. Without the help of react we have to do props drilling

    const clear = () =>{
        setCurrentId(null);
        setPostData({
            title: '', message: '', tags: '', selectedFile: ''
        });
    }

    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align ="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }
    return (
        // Paper is a div having whitish background
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' :'Creating'} a Memory</Typography>
                {/* ...spread operator helps in persisting with all the other properties excpet changing the mention property */}
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className = {classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>
        </Paper>
    );
}

export default Form;