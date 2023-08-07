import React, {useState} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import classes from './AuthForm.module.css';

function AuthForm () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        //check if all the fields are filled

        if(!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        //check if password match
        if(!isLogin && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(
                isLogin
                ?
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLfziEdsH_utwbMdIw8V0olRmeIUAj0V0'
                
                : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLfziEdsH_utwbMdIw8V0olRmeIUAj0V0', 
                {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },

                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                }),
            });

            if (response.ok) {
                const data = await response.json();

        // Save the token in local storage
        localStorage.setItem('token', data.idToken);
              
                //Clear form fields

                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setError('');

                alert('User has successfully signed up');
            } else {
                const data = await response.json();
                setError(data.error.message);
            }
        } catch (error) {
            setError('An error occurred while signing up or logging in');
        }
    };
    if (!isLogin) {
        return (
          <Container>
            <Row>
              <Col xs={12} md={6} className="mx-auto">
                <section className={classes.auth}>
                  <div className="welcome-screen">
                    <h2>Welcome to Expense Tracker</h2>
                  </div>
                </section>
              </Col>
            </Row>
          </Container>
        );
      }
    

    return (
        <Container>
            <Row>
                <Col xs={12} md={6} className="mx-auto">
                <section className={classes.auth}>
                    <div className="signup-form">
                        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                        {error && <p className='error'>{error}</p>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                />
                            </Form.Group>
                            {!isLogin && (
                            <Form.Group>
                                <Form.Label>Confirm Password:</Form.Label>
                                <Form.Control
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                />
                            </Form.Group>
                            )}
                            <Button type="submit">{isLogin ? 'Login' : 'Sign Up'}</Button>
                        </Form>
                        <p>
                            {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}

                            <Button
                            variant="link"
                            onClick={() => setIsLogin((prev) => !prev)}
                            
                            
                            >
                                {isLogin ? 'SignUp' : 'Login'}
                            </Button>
                        </p>
                       

                    </div>
                    </section>
                </Col>
            </Row>
        </Container>
    );
}

export default AuthForm;