import React from "react";
import { getUser, resetUserSession } from "../../Service/AuthService";    

const UserDetail = () => {
    const user = getUser();
  
    return (
        <div>
            Welcome {user.name}, this the user detail page
          
        </div>
    )
}

export default UserDetail;