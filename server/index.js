// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose, { connect } from 'mongoose';
// import cors from 'cors';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const postRoutes = require('./routes/posts');


const app = express(); //initialises the app 
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//specify after configuring cors. otherwise it will throw CORS error
app.use('/posts',postRoutes); //every route inside postRoutes is going to start with posts in the URL 

app.get('/',(req,res)=>{
    res.send("Hello to Memories API");
})
//const CONNECTION_URL = 'mongodb+srv://bsyedida:bharat1998@cluster0.if2t2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; //db connection string
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((err) => console.log(err.message));

mongoose.set('useFindAndModify',false);