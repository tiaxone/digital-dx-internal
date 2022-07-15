import React, { useState} from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Formik } from 'formik';
const registerURL = 'https://aul2e8eadb.execute-api.us-east-1.amazonaws.com/Prod/register'

const Register = () => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [companyName, setCompanyName] = useState(null)
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const submitHandler = (event)=> {
        event.preventDefault();
        if(!username || !email || !password|| !name ){
            setMessage('All fields are required');
            return;
        } else {
            setMessage(null);
        }

        const requestConfig = {
            headers: {
                'x-api-key': 'VpDytYpMyA9PKS6GCyS4v6CxfDBTjfCT9IwxpS80'
            }
        }
        const requestBody = {
            name: name,
            email: email,
            username: username,
            password: password, 
            companyName: companyName
        }
        
        axios.post(registerURL, requestBody, requestConfig).then(respose => {
            setMessage('Registeration Successful')
        }).catch(error=> {
            if(error.response.status == 401){
                setMessage(error.response.data.message);
            } else {
                setError('Sorry.... the was an issues please try again later.');
            }
        })
    }

    return (
        <div className="">
           <h3>Register</h3>
            <div className=" align-items-center justify-content-center" >
                <form validate onSubmit={submitHandler} >     
                <Form.Group className="mb-3">
                    <FloatingLabel controlId="nameInput" label="Full Name">
                        <Form.Control  required type="text" placeholder="Full Name" value={name} onChange={event=> setName(event.target.value)} />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel controlId="emailInput" label="Email">
                        <Form.Control required type="email" placeholder="Email" value={email} onChange={event=> setEmail(event.target.value)} />
                    </FloatingLabel>                  
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel controlId="companyNameInput" label="Company Name">
                        <Form.Control type="text" placeholder="Company Name:" value={companyName} onChange={event=> setCompanyName(event.target.value)} />
                    </FloatingLabel>    
                </Form.Group>
                <Form.Group controlId="usernameInput" className="mb-3">
                    <FloatingLabel  label="User name">
                        <Form.Control  required type="text" placeholder="Username:" value={username} onChange={event=> setUsername(event.target.value)} />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="passwordInput" className="mb-3">
                    <FloatingLabel  label="Password">
                        <Form.Control  required type="password" placeholder="Password" value={password} onChange={event=> setPassword(event.target.value)} />
                    </FloatingLabel>
                </Form.Group>
                <Button type="submit" variant="primary">Register</Button>
                    {error && <p className="error">{error}</p>}
                    {message && <p className="error">{message}</p>}
                </form>
            </div>
          
        </div>
    )
}

export default Register;