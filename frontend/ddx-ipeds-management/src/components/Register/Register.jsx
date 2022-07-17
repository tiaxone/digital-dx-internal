import React, { useState} from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form'
import { Button,Spinner, Container,Row,FloatingLabel, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { useEffect } from "react";

const registerURL = 'https://aul2e8eadb.execute-api.us-east-1.amazonaws.com/Prod/register'

const Register = () => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [companyName, setCompanyName] = useState(null)
    const [loading, setLoading] = useState(false);
    const [api, setApiKey] = useState({});

    const navigate = useNavigate();

    useEffect(()=> {
        setApiKey(process.env.REACT_APP_SECRET_KEY);

    })
    const formSchema = Yup.object().shape({
        fullname: Yup.string().required('Fullname is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is mandatory')
            .min(8, 'Password must be at 6 char long')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
              ),
        confirmPassword: Yup.string()
          .required('Password is mandatory')
          .oneOf([Yup.ref('password')], 'Passwords does not match')
      })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState : { errors }} = useForm(formOptions)
    const onSubmit = () => {

        const requestConfig = {
            headers: {
                'x-api-key':'VpDytYpMyA9PKS6GCyS4v6CxfDBTjfCT9IwxpS80'
            }
        }
        
        const requestBody = {
            name: name,
            email: email,
            password: password, 
            companyName: companyName
        }
        setLoading(true);
        axios.post(registerURL, requestBody, requestConfig).then(respose => {
            setLoading(false);
            navigate('/login')
        }).catch(error=> {
            setLoading(false);
            if(error.response.status == 401){
         
            } else {
                navigate('/error-500')
            }
        })
    }

    return (
        <span >
          <Row className="align-items-center row-spacing" >
            <Col lg={{ span: 4, offset: 4 }}>
                <h3>New user, please register below</h3>
                <Form noValidate onSubmit={handleSubmit(onSubmit)} >     
                    <FloatingLabel className="mb-3" controlId="nameInput" label="Full Name">
                        <Form.Control  {...register('fullname')} required type="text" placeholder="Full Name" value={name} onChange={event=> setName(event.target.value)} className={`form-control ${errors.fullname  ? 'is-invalid' : ''}`}/>
                        {errors.fullname && <Form.Control.Feedback type="invalid">
                                {errors.fullname?.message}
                            </Form.Control.Feedback>} 
                    </FloatingLabel>
                    <FloatingLabel className="mb-3" controlId="emailInput" label="Email">
                        <Form.Control {...register('email')} required type="email" placeholder="Email" value={email} onChange={event=> setEmail(event.target.value)} className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
                        {errors.email && <Form.Control.Feedback type="invalid">
                                {errors.email?.message}
                            </Form.Control.Feedback>} 
                    </FloatingLabel>                 
                    <FloatingLabel className="mb-3" controlId="companyNameInput" label="Company Name">
                        <Form.Control type="text" placeholder="Company Name:" value={companyName} onChange={event=> setCompanyName(event.target.value)} />
                    </FloatingLabel>    
                    <FloatingLabel className="mb-3" label="Password">
                        <Form.Control required {...register('password')} type="password" placeholder="Password" value={password} onChange={event=> setPassword(event.target.value)}  className={`form-control ${errors.password ? 'is-invalid' : ''}`}/>
                            {errors.password && <Form.Control.Feedback type="invalid">
                                {errors.password?.message}
                            </Form.Control.Feedback>} 
                    </FloatingLabel>
                    <FloatingLabel className="mb-3" label="Confirm Password">
                        <Form.Control required type="password" {...register('confirmPassword')} placeholder="Confirm Password" value={confirmPassword} onChange={event=> setConfirmPassword(event.target.value)} className={`form-control ${errors.confirmPassword  ? 'is-invalid' : ''}`} />
                        {errors.confirmPassword && <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword?.message}
                            </Form.Control.Feedback>} 
                    </FloatingLabel>
                
                    <Button type="submit" variant="primary">
                    {loading && <span><Spinner 
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        /> Loading... </span>}
                        {!loading && <span>Register</span>}</Button>
                    </Form>
                </Col>
            </Row>
          
       </span>
    )
}

export default Register;