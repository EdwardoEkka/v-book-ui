import { useEffect } from "react";
import { googleAuthentication } from "../api/api";
import { useNavigate } from "react-router-dom";


const Auth=()=>{
    const params = new URLSearchParams(window.location.search);
    const authCode = params.get("code");
    const navigate = useNavigate();


    useEffect(()=>{
        const FetchGoogleUser=async()=>{
            try {
                const response=await googleAuthentication(authCode);
                console.log(response);
                localStorage.setItem("token", response.data.token);
                setTimeout(() => navigate("/", { replace: true }), 1000);
            } catch (error) {
                console.error(error);
            }
        }
        FetchGoogleUser();
    },[])

    return(
        <div>
            {authCode}
        </div>
    )
}

export default Auth;