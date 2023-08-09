import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import classes from './AuthForm.module.css';

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileIncomplete, setProfileIncomplete] = useState(true);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [fullName, setFullName] = useState('');
const [profilePhotoUrl, setProfilePhotoUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all the fields are filled
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Check if password match
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(
        isLogin
          ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLfziEdsH_utwbMdIw8V0olRmeIUAj0V0'
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
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Save the token in local storage
        localStorage.setItem('token', data.idToken);

        // Clear form fields
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
        setIsLoggedIn(true);
        setProfileIncomplete(true);

        alert('User has successfully signed up');
      } else {
        const data = await response.json();
        setError(data.error.message);
      }
    } catch (error) {
      setError('An error occurred while signing up or logging in');
    }
  };

  const handleCompleteProfile = () => {
    setShowProfilePage(true);
  };

  const handleUpdateProfile = async () => {
    // Call the Firebase API to update the user details
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDLfziEdsH_utwbMdIw8V0olRmeIUAj0V0`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken: token,
            displayName: 'New Display Name', // Update the display name here
            photoUrl: 'New Photo URL', // Update the photo URL here
            returnSecureToken: true,
          }),
        }
      );

      if (response.ok) {
        alert('User details updated successfully');
      } else {
        const data = await response.json();
        setError(data.error.message);
      }
    } catch (error) {
      setError('An error occurred while updating user details');
    }
  };

  if (isLoggedIn) {
    if (profileIncomplete) {
      if (showProfilePage) {
        return (
          <Container>
              <Row>
    <Col xs={12} md={6} className="mx-auto">
      <div className={classes.profile}>
        <h2>Complete Your Profile</h2>
        <form>
          <div className={classes.form}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className={classes.form}>
            <label htmlFor="profilePhotoUrl">Profile Photo URL</label>
            <input
              type="text"
              id="profilePhotoUrl"
              value={profilePhotoUrl}
              onChange={(e) => setProfilePhotoUrl(e.target.value)}
            />
          </div>

          <button className={classes.button}  type="button" onClick={handleUpdateProfile}>
            Update Profile
          </button>
        </form>
      </div>
    </Col>
  </Row>
          </Container>
        );
      } else {
        return (
          <Container>
            <Row>
              <Col xs={12} md={6} className="mx-auto">
                <section className={classes.auth}>
                  <div className="profile-incomplete">
                    <h2>Welcome to Expense Tracker</h2>
                    <h3>Your profile is incomplete</h3>
                    <p>Please complete your profile to continue</p>
                    <Button onClick={handleCompleteProfile}>Complete Profile</Button>
                  </div>
                </section>
              </Col>
            </Row>
          </Container>
        );
      }
    } else {
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
  }

  return (
    <Container>
      <Row>
        <Col xs={12} md={6} className="mx-auto">
          <section className={classes.auth}>
            <div className="signup-form">
              <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
              {error && <p className="error">{error}</p>}
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
                <p onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'Create an account' : 'Already have an account? Login'}
                </p>
              </Form>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthForm;