import { Outlet, Navigate } from "react-router-dom";

const Token = JSON.parse(localStorage.getItem('admin'))
const PrivateRoutes = () => {
    // if(Token){
        // let auth = { 'token': true }
    return(
        Token ? <Outlet/> : <Navigate to = '/adminLogin'/>
    )
}


export default PrivateRoutes