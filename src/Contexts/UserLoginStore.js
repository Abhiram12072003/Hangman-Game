import { useState } from "react";
import axios from "axios";
import { LoginContext } from "./LoginContext";

function UserLoginStore({children}){

    const [currentUser,setCurrentUser] = useState({});
    const [loginErr,setLoginErr] = useState("");
    const [userLoginStatus,setUserLoginStatus] = useState(false);
    
    const loginUser=(userCredentialsObj)=>{
        axios.post('http://localhost:3500/user-api/login',userCredentialsObj)
            .then((response)=>{
                if(response.data.message==='Success'){
                    // save token to local server
                    console.log("response",response);
                    localStorage.setItem("token",response.data.token);
                    //navigate to users profile
                    setCurrentUser({...response.data.user});
                    console.log("user",currentUser);
                    setLoginErr("");
                    console.log('Navigated to users profile')
                    setUserLoginStatus(true);
                }
                else{
                    console.log('user login failed',response.data.message);
                    setLoginErr(response.data.message);
                }
            })
            .catch((err)=>{
                console.log("err:",err.message);
                setLoginErr(err.message);
            })
    }

    const logOutUser=()=>{
        localStorage.clear();
        setUserLoginStatus(false);  
    }
    return (<div>
        <LoginContext.Provider value={[currentUser, loginErr, userLoginStatus, loginUser,logOutUser]}>
            {children}
        </LoginContext.Provider>
    </div>); 
}

export default UserLoginStore;