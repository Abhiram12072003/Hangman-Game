// create mini-express userApp
const exp=require('express');
const userApp=exp.Router();
const expressAsyncHandler=require('express-async-handler');
const bcryptjs=require("bcryptjs")
const jwt=require('jsonwebtoken')
// body parser middleware
// const verifyToken=require("./Middlewares/verifyToken");
userApp.use(exp.json());

//get all users
userApp.get("/get-users",expressAsyncHandler(async (request,response)=>{
    const userCollectionObj=request.app.get("userCollectionObj")
    let usersList=await userCollectionObj.find().toArray()
    response.status(200).send({message:"users",payload:usersList})
}))

// get user by id
// userApp.get("/get-user/:id",expressAsyncHandler(async(request,response)=>{
//     const userCollectionObj=request.app.get('userCollectionObj');
//     let userid=+request.params.id
//     let user=await userCollectionObj.findOne({id:{$eq:userid}})
//     response.status(200).send({message:'User found',payload:user})
// }))

// create user
userApp.post("/register",expressAsyncHandler(async (request,response)=>{
    // db.userCollection.insertOne(userObj)
    const userCollectionObj=request.app.get("userCollectionObj")
    // get newUser from body
    const newUser=request.body;
    let userOfDb=await userCollectionObj.findOne({username:newUser.username})
    if(userOfDb!=null){
        response.status(200).send({message:"User already existed"})
    }
    // check for duplicate user by username
    // if user already existed,send res to client as 'user already existed'
    // if user not existed
    else{
    //      hash the password
        // console.log('hi');
        let hashedPassword=await bcryptjs.hash(newUser.password,5);
    //      replace plain pass with hashed password
        newUser.password=hashedPassword;
    //      insert user
        await userCollectionObj.insertOne(newUser);
        response.status(201).send({message:'User created'})
    }  
}))

userApp.post("/login",expressAsyncHandler(async (request,response)=>{
    // get userCollection obj
    // console.log("login request header",request.headers)
    const userCollectionObj = request.app.get("userCollectionObj");    
    const userCredObj=request.body;
    console.log(userCredObj);
    // verify user name
    let userDb=await userCollectionObj.findOne({username:userCredObj.username})
    // if user name is invalid
    if(userDb===null){
        response.status(200).send({message:"Invalid username"})
    }
    else{
        //verify password
        let isEqual=await bcryptjs.compare(userCredObj.password,userDb.password);
        
        // password not matched
        if(isEqual===false){
            response.status(200).send({message:'Invalid password'})
        }
        
        // password is matched
        else{
            //Create a jwt token
            let jwtToken=jwt.sign({username:userDb.username},'abcdef',{expiresIn:50})
            //send token in a response
            delete userDb.password;
            response.status(200).send({message:'Success',token:jwtToken,user:userDb})           
        }
    }
}))

userApp.get('/test',expressAsyncHandler(async(request,response)=>{
    console.log("test",request.headers);
    response.send({message:'Test'})
}))

// update user
userApp.put("/update-user",expressAsyncHandler(async (request,response)=>{
    const userCollectionObj=request.app.get('userCollectionObj');
    let modifiedData=request.body;
    let res=userCollectionObj.updateOne({id:modifiedData.id},{$set:{...modifiedData}})
    response.status(200).send({message:'User updated'})
}))
// delete user
userApp.delete("/delete-user/:id",expressAsyncHandler(async (request,response)=>{
    const userCollectionObj=request.app.get('userCollectionObj');
    let userId=+request.params.id;
    let res=await userCollectionObj.deleteOne({id:userId})
    response.status(200).send({message:'User removed'})
}))

// get user by name
userApp.get('/get-user/:username',expressAsyncHandler(async (request,response)=>{
    const userCollectionObj=request.app.get('userCollectionObj');
    let usernameFromUrl=request.params.username;
    let userofDb=await userCollectionObj.findOne({username:usernameFromUrl})
    // if user not found
    if(userofDb===null){
        response.status(200).send({message:'User not found'})
    }
    else{
      delete userofDb.password;
      response.status(200).send({message:'User',payload:userofDb})  
    }
}))

module.exports=userApp;