import { useState } from "react"
import {Routes,Route, useNavigate} from "react-router-dom"

import AuthContext from "./contexts/authContext"
import * as authService from "./services/authService"
import Path from "./paths"

import Header from "./components/Header/Header"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import GameCreate from "./components/game-create/GameCreate"
import GameList from "./components/game-list/GameList"
import GameDetails from "./components/game-details/GameDetails"




function App() {
  const navigate = useNavigate()
  const [auth, setAuth] = useState({})


  // accessToken
  // email
  // username
  // _id
  
//!needs an error handling
  const loginSubmitHandler= async(formValues) =>{

    console.log(formValues);
    const result = await authService.login(formValues.email, formValues.password)
    
    setAuth(result)
    navigate(Path.Home)
  }

  //!needs an error handling
  const registerSubmitHandler = async(formValues) =>{
   const result = await authService.register(formValues.email, formValues.password)
  
   setAuth(result)
    navigate(Path.Home)
  }

  const values = {
    registerSubmitHandler,
    loginSubmitHandler,
    username: auth.username || auth.email,
    email:auth.email,
    isAuthenticated: !!auth.email
  }

  return (
    <AuthContext.Provider value={values}>
      
      
      <div id='box'>
    <Header/>
    <Routes>
      <Route path={Path.Home} element={<Home/>}/>
      <Route path="/games" element={<GameList/>}/>
      <Route path="/games/create" element={<GameCreate/>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/games/:gameId" element={<GameDetails/>}/>
    </Routes>
    
    </div>
      </AuthContext.Provider>
    
   
  )
}

export default App
