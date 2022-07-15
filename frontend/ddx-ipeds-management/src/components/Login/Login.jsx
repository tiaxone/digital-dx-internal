import React, { useState} from "react";
import axios from 'axios';
import { setUserSession } from "../../Service/AuthService";
import { useNavigate } from "react-router-dom";
const loginURL = 'https://aul2e8eadb.execute-api.us-east-1.amazonaws.com/Prod/login';

const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorMessage, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
  

    const submitHandler = (event)=> {
        event.preventDefault();
        if(!username || !password){
            setError('All fields are required');
            return;
        } else {
            setError(null);
        }

        const requestConfig = {
            headers: {
                'x-api-key': 'VpDytYpMyA9PKS6GCyS4v6CxfDBTjfCT9IwxpS80'
            }
        }
        const requestBody = {
            userId: username,
            password: password, 
           
        }
        
        axios.post(loginURL, requestBody, requestConfig).then(response => {
            setUserSession(response.data.user, response.data.token);
            setMessage('Registeration Successful');
            navigate('user')
        }).catch(error=> {
            if(error.response.status == 401 || error.response.status == 403){
                setMessage(error.response.data.message);
                
            } else {
                setError('Sorry.... the was an issues please try again later.');
            }
        })
    }

    return (
        <div className=" d-flex align-items-center justify-content-center">
            <h5>Login</h5>
           <form onSubmit={submitHandler}>
                <span className="formLabel">Username:</span><input type="text" value={username} onChange={event=> setUsername(event.target.value)} /><br/>
                <span className="formLabel">Password:</span> <input type="text" value={password} onChange={event=> setPassword(event.target.value)} /><br/>
                <input type="submit" value="Login"/>
            </form>
           {errorMessage && <p className="error">{errorMessage}</p>}
           {message && <p className="message">{errorMessage}</p>}
        </div>
    )
}

export default Login;