import ExpenseTracker from './ExpenseItems';
import classes from './AuthForm.module.css';
import {  Container, Row, Col } from 'react-bootstrap';

function WelcomeScreen({ handleCompleteProfile, logout }) {
    return (
        <Container>
          <Row>
            <Col xs={12} md={6} className="mx-auto">
              <section >
                <div className={classes.main}>
                <div className={classes.left}>
                  <h2>Welcome to Expense Tracker!!!!</h2>
                  </div>
                  <div className={classes.right}>
                  <h3>Your profile is incomplete</h3>
                  <span className={classes.completeprofile} onClick={handleCompleteProfile}>Complete Profile</span>
                  </div>
                  <button className={classes.logoutbutton} onClick={logout}>logout user</button>
                  </div>
                  <div className={classes.verticalline}></div>
                
                  <ExpenseTracker key="expense-tracker" />
              </section>
            </Col>
          </Row>
        </Container>
      );


}

  export default WelcomeScreen;