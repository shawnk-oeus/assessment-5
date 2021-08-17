import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap'
import UserContext from '../context/UserContext';

const Login = () => {

  const {isLoggedIn, handleLogin} = useContext(UserContext);

  if (isLoggedIn) {
    return (<div>
       <Redirect to="/" />
    </div>)
  }

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" >
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" name='username' />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="password" name='password'/>
        </Form.Group>
        <Button variant="primary" type="submit" id='loginButton'>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;

