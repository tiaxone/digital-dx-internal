
import { BrowserRouter } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navigation/Navigation";
import Routing from "./router/router";
import { useEffect, useState } from 'react';
import { getToken, getUser, resetUserSession, setUserSession } from './Service/AuthService';

import axios from 'axios';

const verifyTokenAPIURL = 'https://m7terbaef1.execute-api.us-east-1.amazonaws.com/Prod/verify';
function App() {

  const [isAuthenicating, setAuthenticating] = useState(true);

  useEffect(() => {
    const token = getToken();
    if(token === 'undefined' || token === undefined || token === null || !token){
      return;
    }

    const requestConfig = {
      headers: {
        'x-api-key': 'VpDytYpMyA9PKS6GCyS4v6CxfDBTjfCT9IwxpS80'
      }
    }

    const requestBody = {
      user: getUser(),
      token: token
    }
    axios.post(verifyTokenAPIURL, requestBody, requestConfig).then(response => {
      setUserSession(response.data.user, response.data.token);
      setAuthenticating(false);
    }).catch(() => {
      resetUserSession();
      setAuthenticating(false);
    }, [] );
  });

  const token = getToken();
  if(isAuthenicating && token) {
    return <div className='content'>Authenicating...</div>
  }

  return (
    <div>
     <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routing />    
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
