import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './AuthForm.module.css';

function ProfilePage({ fullName, profilePhotoUrl, setFullName, setProfilePhotoUrl, logout, handleUpdateProfile }) {
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
              <button className={classes.logoutbutton} onClick={logout}>logout user</button>
              

              <button className={classes.button} type="button" onClick={handleUpdateProfile}>
                Update Profile
              </button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;