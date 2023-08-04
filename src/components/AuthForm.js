import React, {useState} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';

function AuthForm () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        //check if all the fields are filled

        if(!email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        //check if password match
        if(password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLfziEdsH_utwbMdIw8V0olRmeIUAj0V0', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },

                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                //Clear form fields

                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setError('');

                alert('User has successfully signed up');
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred while signing up');
        }
    };

    return (
        <Container>
            <Row>
                <Col xs={12} md={6} className="mx-auto">
                    <div className="signup-form">
                        <h2>Sign Up</h2>
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
                            <Form.Group>
                                <Form.Label>Confirm Password:</Form.Label>
                                <Form.Control
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                />
                            </Form.Group>
                            <Button type="submit">Sign Up</Button>
                        </Form>

                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AuthForm;