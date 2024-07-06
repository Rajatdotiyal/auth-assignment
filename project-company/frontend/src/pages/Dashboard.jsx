import { useEffect } from "react";
import { Appbar } from "../components/AppBar";
import { Users } from "../components/Usercomponent";
import axios from "axios";




export function Dashboard(){

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/dashboard",{
            headers : {
                Authorization : "Bearer " + localStorage.getItem('token')
            }
        })
    },[])
    return <div>
        <Appbar/>
        <Users/>
    </div>
}