const jwt = require('jsonwebtoken');

//wants to like a post 
// click the like button  => auth middleware (next) => like controller 
//..........................auth middleware checks if user is granted to like a post or not then passes the control to like controller


const auth = async(req,res,next) =>{
    //do something and move to next thing
    
    try{
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500 ; // length is > 500 the it is google auth 

        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token,'test');// verify the token gives us username of person and id

            req.userId = decodedData && decodedData.id;
        }
        else{
            decodedData = jwt.decode(token);
            req.userId = decodedData && decodedData.sub;// sub differentiates every single google user 
        }

        next();
    }
    catch(e){
        console.log(e);
    }
}


module.exports = auth;