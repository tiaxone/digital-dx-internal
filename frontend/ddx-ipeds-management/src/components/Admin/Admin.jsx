import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser, resetUserSession } from "../../Service/AuthService";    

const Admin = () => {
    const user = getUser();

    return (
        <div>
            Welcome {user.name}, this the Adimn page
          
        </div>
    )
}

export default Admin;