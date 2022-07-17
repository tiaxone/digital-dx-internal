import React, { useState} from "react";
import Register from "../Register/Register";
import Login from "./Login";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const loginURL = 'https://aul2e8eadb.execute-api.us-east-1.amazonaws.com/Prod/login';

const LoginLanding = () => {

    return (
        <Container>
            <Row >
                <Login/>
            </Row>
            <Row>
            <hr
                style={{
                    margin: '50px 0px',
                    background: '#000',
                    color: '#000',
                    borderColor: '#000',
                    height: '1px',
                }}
                />
            </Row>
            <Row>
                <Register/>
            </Row>
        </Container>
    )
}

export default LoginLanding;