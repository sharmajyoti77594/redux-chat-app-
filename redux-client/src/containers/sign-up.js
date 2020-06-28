import React from 'react';
import { connect } from 'react-redux';
import { textChange } from '../actions/common-actions'
import { submit } from '../actions/sign-up';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import AccountCreated from '../components/AccountCreatedPage';

class SignUp extends React.Component {
    constructor (props) {
        super(props)
    }

    handleChange = (e) => {
      this.props.dispatch(textChange(e.target.name, e.target.value))
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { userData } = this.props.textChangeReducer;
        this.props.dispatch(submit(userData));
    }

    render () {
        const { userData } = this.props.textChangeReducer;
        const { notifications } = this.props.notifications;

        return (
            <div className="loginBox">
                  {notifications.message === 'Account created successfully' ?
                    <AccountCreated /> : 
                    <React.Fragment>
                       <h1>Sign Up</h1>
                        <form onSubmit={this.onSubmit}>
                            <TextField
                                name="signUpFirstName"
                                label="first name"
                                variant="outlined"
                                value={userData.signUpFirstName}
                                onChange={this.handleChange}
                                reqired="true"
                            />
                            <TextField
                                name="signUpLastName"
                                label="last name"
                                variant="outlined"
                                value={userData.signUpLastName}
                                onChange={this.handleChange}
                                reqired="true"
                            />
                            <TextField
                                name="signUpEmail"
                                type="email"
                                label="email"
                                variant="outlined"
                                value={userData.signUpEmail}
                                onChange={this.handleChange}
                                reqired="true"
                            />
                            <TextField
                                type="password"
                                name="signUpPassword"
                                label="password"
                                variant="outlined"
                                value={userData.signUpPassword}
                                onChange={this.handleChange}
                                reqired="true"
                            />
                            <TextField
                                type="password"
                                name="signUpPwconfirm"
                                label="confirm password"
                                variant="outlined"
                                value={userData.signUpPwconfirm}
                                onChange={this.handleChange}
                                reqired="true"
                            />
                            <br />
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </form>
                        <p>
                            Aleady have an account? <br />
                            <a href="/sign-in">Log in here</a>
                        </p>
                        {notifications.type &&
                            <div className="alert">
                            <Alert severity={notifications.type}>
                                    <AlertTitle>{notifications.type}</AlertTitle>
                                    {/* This is an error alert — <strong>check it out!</strong> */}
                                    {notifications.message}
                            </Alert>
                        </div>
                        }
                    </React.Fragment>
                  }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(SignUp);