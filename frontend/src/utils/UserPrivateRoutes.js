import { Outlet, Navigate } from "react-router-dom";

const token = JSON.parse(localStorage.getItem('user'))?.token

const PrivateRoutes = () => {
    // if(Token){
        // let auth = { 'token': true }
    return(
        token ? <Outlet/> : <Navigate to = '/login'/>
    )
}


export default PrivateRoutes