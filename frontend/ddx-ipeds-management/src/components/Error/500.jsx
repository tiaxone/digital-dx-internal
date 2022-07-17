import { Button,Spinner, Container,Row } from 'react-bootstrap';
import React from "react";
import errorImage from "../../images/500-error.png";
const Error500 = () => {
    return (
    <Container  fluid="md">
        <Row>
             <img src={errorImage}></img>
        </Row>
    </Container>
    )
}
export default Error500;