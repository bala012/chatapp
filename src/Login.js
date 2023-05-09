import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";



function Login() {
  const signIn = (e) => {
    auth.signInWithPopup(provider);
    
  };
  return (
    <div className="login">
    
      <Button onClick={signIn} className="login__button">
        Sign In
      </Button>
    </div>
  );
}

function logOut() {
  const signOut=(e)=>{
    auth.signOut();
  };
  return (
    <div className="signOut">
      <div className="signOut__logo">
        <img
          src="http://www.clipartbest.com/cliparts/7Ta/Ldk/7TaLdkAbc.png"
          alt=""
        />
      </div>
      <Button onClick={signOut} className="signOut__button">
        Sign Out
      </Button>
    </div>
  );
}

export default Login;
