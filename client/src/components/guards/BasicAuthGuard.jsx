import { useContext } from "react"
import AuthContext from "../../contexts/authContext"
import { useNavigate } from "react-router-dom"
export default function AuthGuard(props){
    const {isAuthenticated} = useContext(AuthContext)

    if(!isAuthenticated) {
        const navigate= useNavigate()
        navigate('/login')
        return null
    }
    return (
        <>
        {props.children}
        </>
      
    )
}