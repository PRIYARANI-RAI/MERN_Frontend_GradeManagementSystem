import { Navigate,Outlet } from "react-router";
import { useSelector } from "react-redux";

export default function ProtectedOutlet(){
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if(isLoggedIn){
        return<Outlet/>
    }else{
        return <Navigate to ="/login" />
    }
}