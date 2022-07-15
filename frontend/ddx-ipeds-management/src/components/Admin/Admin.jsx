import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser, resetUserSession } from "../../Service/AuthService";    

const Admin = () => {
    const user = getUser();
    const name = user !== 'undefined'
    const navigate = useNavigate();
    const logoutHandler = () => {
        resetUserSession();
        navigate('/login');
    }
    return (
        <div>
            Welcome {name}, this the Adimn page
            <input type='button' value='logout' onClick={logoutHandler} />
        </div>
    )
}

export default Admin;