import React from 'react';
import { signupUser } from '../api/UserApi';
import { Form, Button, Container } from 'react-bootstrap';

const SignupPage = (props) => {
  const { history } = props;
  const handleSignup = async (evt) => {
    evt.preventDefault();
    let userObject = {
      'username': evt.target.username.value,
      'password': evt.target.password.value,
      'first_name': evt.target.firstname.value,
      'last_name': evt.target.lastname.value,
    }
    let response = await signupUser(userObject);
    let data = await response.json();
    if (data.error) {
      console.log('there was an error signing up');
    } else {
      history.push('/');
    }

  }

  return (
    <Container>
      <Form onSubmit={handleSignup}>
         <Form.Group className="mb-3">
          <Form.Label>User Name:</Form.Label>
          <Form.Control type='text' placeholder='Enter username' name='username' />
        </Form.Group>  
        <Form.Group className="mb-3"> 
          <Form.Label>First Name:</Form.Label>
          <Form.Control type='text' placeholder='Enter first name' name='firstname' />
        </Form.Group>   
        <Form.Group className="mb-3">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control type='text' placeholder='Enter last name' name='lastname' />
        </Form.Group>     
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type='password' placeholder='Password' name='password' />
        </Form.Group>
        <Button variant='primary' type='submit'>Sign Up</Button>
      </Form>
    </Container>
  );
};

export default SignupPage;
