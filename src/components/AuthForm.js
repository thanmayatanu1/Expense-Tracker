import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import classes from './AuthForm.module.css';
import axios from 'axios';
import  WelcomeScreen from './WelcomeScreen';
import ProfilePage from './ProfilePage';


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
  const [userProfile, setUserProfile] = useState(null);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

const logout = () => {
  localStorage.removeItem('token');
  setIsLoggedIn(false);
};

const sendEmailVerification = async () => {
  try {
    const apiKey = 'AIzaSyDLfziEdsH_utwbMdIw8V0olRmeIUAj0V0';
    const idToken = localStorage.getItem('token');
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`;

    const response = await axios.post(url, {
      requestType: 'VERIFY_EMAIL',
      idToken: idToken,
    });

    if (response.status === 200) {
      alert('Verification email sent. Please check your email.');
    } else {
      throw new Error('An error occurred while sending the verification email.');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred while sending the verification email.');
  }
};

const handleForgotPassword = async () => {
  // Check if the email field is filled
  if (!email) {
    setError('Please enter your email');
    return;
  }

  try {
    const apiKey = 'AIzaSyDLfziEdsH_utwbMdIw8V0olRmeIUAj0V0';
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`;

    const response = await axios.post(url, {
      requestType: 'PASSWORD_RESET',
      email: email,
    });

    if (response.status === 200) {
      setIsPasswordReset(true);
      setError('');
      alert('Password reset link has been sent to your email. Please check your inbox.');
    } else {
      throw new Error('An error occurred while sending the password reset link.');
    }
  } catch (error) {
    console.error(error);
    setError('An error occurred while sending the password reset link.');
  }
};


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

        fetchUserProfile();
        sendEmailVerification();

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

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDLfziEdsH_utwbMdIw8V0olRmeIUAj0V0`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken: token,
          }),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.users[0]); // Assuming the response contains a single user object
      } else {
        const data = await response.json();
        setError(data.error.message);
      }
    } catch (error) {
      setError('An error occurred while fetching user profile');
    }
  };

  if (isLoggedIn) {
    if (profileIncomplete) {
      if (showProfilePage) {
        return (
          <ProfilePage
            fullName={fullName}
            profilePhotoUrl={profilePhotoUrl}
            setFullName={setFullName}
            setProfilePhotoUrl={setProfilePhotoUrl}
            logout={logout}
            handleUpdateProfile={handleUpdateProfile}
          />
        );
      }
       else {
        return (
          <div>
            <WelcomeScreen handleCompleteProfile={handleCompleteProfile} logout={logout} sendEmailVerification={sendEmailVerification}/>
          </div>
        )
        
      }
    } else {
      return (
        <Container>
          <Row>
          <Col>
            <h2>Welcome to Expense Tracker</h2>
            <p>Name: {userProfile.displayName}</p>
            <p>Email: {userProfile.email}</p>
            {/* Display other profile data here */}
            
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
                {isPasswordReset ? (
                <p>Password reset link has been sent. Please check your email.</p>
              ) : (
                <Button type="submit">{isLogin ? 'Login' : 'Sign Up'}</Button>
                 )}
                <p onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'Create an account' : 'Already have an account? Login'}
                </p>
                {!isPasswordReset && (
                <Button onClick={handleForgotPassword}>
                  Forgot Password
                </Button>
              )}
              </Form>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  );
}


export default AuthForm;