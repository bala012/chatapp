import Chat from './Chat';
import React, { useEffect } from 'react';
import './App.css';
import Sidebar from './Sibebar'
import { login, logout, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import {auth} from './firebase'
import { useState } from 'react';

function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser);
  const [loading,setLoading] = useState(false)

  useEffect(() => {

    auth.onAuthStateChanged((authUser) => {
      setLoading(true)
      console.log('user is' ,authUser)
      if(authUser){
        dispatch( login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        })
        )
        setLoading(false)
      } else{
        //log out
        setLoading(false)
        dispatch(logout())
      }
    })
  }, [dispatch])
  return (
    <div className="app">
      {loading ? <h1>loading</h1> : user ? (
        <>
        <Sidebar />
        <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
