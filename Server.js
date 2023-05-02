const exp=require("express");
const app=exp();
const path=require("path");

app.listen(3500, () => {console.log("listening on port 3500");});

// connect react build
app.use(exp.static(path.join(__dirname,"./build")))

// get mongoclient
const mclient=require('mongodb').MongoClient;

mclient.connect('mongodb://0.0.0.0:27017')
    .then((dbRef)=>{
        //connect to a database
        const dbObj=dbRef.db('hangman');
        // Connect to collections of database
        const userCollectionObj=dbObj.collection('users');
        // const productCollectionObj=dbObj.collection('productCollection');
        // Shre collection to API's
        app.set('userCollectionObj',userCollectionObj);
        // app.set('productCollectionObj',productCollectionObj);
        console.log('DB connection success')
    })
    .catch(err=>console.log("database connect error:",err))
// const middleware1=(request,response,next)=>{
//     console.log("middleware1");
//     next();
// }
// const middleware2=(request,response,next)=>{
//     console.log("middleware2");
//     next();
// }
// app.use(middleware2);
//Create user api
// import userapp
const userApp=require('./Apis/UsersAPi');
// const productApp=require('./APIs/productApi');
// execute user api when path starts with /user-api
app.use("/user-api",userApp);
// app.use("/products-api",productApp);

// execute product api when path starts with /products-api

// invalid path
const invalidpathMiddleware=(request,response,next)=>{
    response.send({message:'Invalid path'});
}
app.use("*",invalidpathMiddleware);

// error handling middleware
const errhandlingMiddleware=(error,request,response,next)=>{
    response.send({message:error.message});
}

app.use(errhandlingMiddleware);