import React, { useState} from "react";
import axios from 'axios';
import { setUserSession } from "../../Service/AuthService";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Button,Spinner, Container,Row,Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const loginURL = 'https://aul2e8eadb.execute-api.us-east-1.amazonaws.com/Prod/login';

const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorMessage, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        axios.post(loginURL, requestBody, requestConfig).then(response => {
            setUserSession(response.data.user, response.data.token);
            setMessage('Registeration Successful');
            navigate('user');
            setLoading(false);
        }).catch(error=> {
            setLoading(false);
            if(error.response.status == 401 || error.response.status == 403){
                setMessage(error.response.data.message);
                
            } else {
                setError('Sorry.... the was an issues please try again later.');
            }
        })
    }

    return (
        <div>
            <Row className="align-items-center row-spacing" >
                <Col lg={{ span: 4, offset: 4 }} >
                    <h3>Exising user login</h3>
                    <div className=" align-items-center justify-content-center" >
                        <Form validate onSubmit={submitHandler} >     
                            <FloatingLabel  label="Email" className="mb-3">
                                <Form.Control  required type="text" placeholder="Email" value={username} onChange={event=> setUsername(event.target.value)} />
                            </FloatingLabel>
                
                            <FloatingLabel  label="Password" className="mb-3">
                                <Form.Control    required type="password" placeholder="Password" value={password} onChange={event=> setPassword(event.target.value)} />
                            </FloatingLabel>
                            <Button type="submit" variant="primary">
                            {loading && <span><Spinner 
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                /> Loading... </span>}
                                {!loading && <span>Login</span>}</Button>
                                {errorMessage && <p className="error">{errorMessage}</p>}
                                {message && <p className="error">{message}</p>}
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Login;