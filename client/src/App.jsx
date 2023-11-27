import {Routes,Route} from "react-router-dom"

import {AuthProvider} from "./contexts/authContext"
import Path from "./paths"

import Header from "./components/Header/Header"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import GameCreate from "./components/game-create/GameCreate"
import GameList from "./components/game-list/GameList"
import GameDetails from "./components/game-details/GameDetails"
import Logout from "./components/logout/Logout"
import GameEdit from "./components/game-edit/GameEdit"
import ErrorBoundary from "./components/error-boundart/ErrorBoundary"
import AuthGuard from "./components/guards/BasicAuthGuard"




function App() {


  return (
    <ErrorBoundary>


 <AuthProvider>
      
      
      <div id='box'>
    <Header/>
    <Routes>
      <Route path={Path.Home} element={<Home/>}/>
      <Route path="/games" element={<GameList/>}/>
      <Route path="/games/create" element={<GameCreate/>}/>
      <Route path="/games/:gameId" element={<GameDetails/>}/>

      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login />}/>
    
    

    <Route element={<AuthGuard/>}>
    <Route path="/games/create" element={<GameCreate/>}/>
      <Route path={Path.GameEdit} element={<GameEdit/>}/>
      <Route path={Path.Logout} element={<Logout/>}/>
        
    
    </Route>


    </Routes>
    </div>
    
      </AuthProvider>
    

    </ErrorBoundary>
   
   
  )
}

export default App
