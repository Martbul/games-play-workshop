import { useNavigate} from "react-router-dom"
import { createContext } from "react";

import Path from "../paths"
import * as authService from "../services/authService"
import usePersistedState from "../hooks/usePersistedState";
 const AuthContext = createContext()
 AuthContext.displayName ='AuthContext'
 
 export const AuthProvider = ({
    children,
    
 }) =>{
     const navigate = useNavigate()
    const [auth, setAuth] = usePersistedState('auth',{})
  
  
    // accessToken
    // email
    // username
    // _id
    
  //!needs an error handling
    const loginSubmitHandler= async(formValues) =>{
  
      console.log(formValues);
      const result = await authService.login(formValues.email, formValues.password)
      
      setAuth(result)
      localStorage.setItem('accessToken', result.accessToken)
      navigate(Path.Home)
    }
  
    //!needs an error handling
    const registerSubmitHandler = async(formValues) =>{
     const result = await authService.register(formValues.email, formValues.password)
    
     setAuth(result)
     
     localStorage.setItem('accessToken', result.accessToken)
      navigate(Path.Home)
    }
  
    const logoutHandler =()=>{
      setAuth({})
      
      localStorage.removeItem('accessToken')
      
    }
  
    const values = {
      registerSubmitHandler,
      logoutHandler,
      loginSubmitHandler,
      username: auth.username || auth.email,
      email:auth.email,
      isAuthenticated: !!auth.accessToken
    }
    return(
        
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>

    )
 }
 export default AuthContext
