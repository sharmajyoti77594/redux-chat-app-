import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { textChange } from '../actions/common-actions'
import { submit } from '../actions/sign-in';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';

class SignIn extends React.Component {
    constructor (props) {
        super (props)
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
        const { notifications } = this.props.notifications;
        let { userData, token } = this.props.textChangeReducer;
        localStorage.setItem('document', JSON.stringify(token));

        console.log(this.props, '&&&')
        return (
            <React.Fragment>
                {notifications.message === 'Login successful' ? 
                    <Redirect to='/chat-room'/> : 
                    <div className="loginBox">
                    <h1>Sign In</h1>
                    <form onSubmit={this.onSubmit}>
                        <TextField
                            name="signInEmail"
                            type="email"
                            label="email"
                            variant="outlined"
                            value={userData.signInEmail}
                            onChange={this.handleChange}
                            reqired="true"
                        />
                        <TextField
                            type="password"
                            name="signInPassword"
                            label="password"
                            variant="outlined"
                            value={userData.signInPassword}
                            onChange={this.handleChange}
                            reqired="true"
                        />
                        <br />
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </form>
                    {notifications.type &&
                        <div class="alert">
                            <Alert severity={notifications.type}>
                                <AlertTitle>{notifications.type}</AlertTitle>
                                    {/* This is an error alert — <strong>check it out!</strong> */}
                                {notifications.message}
                            </Alert>
                        </div>
                    }
                    <p>
                        Don't have an account? <br />
                        <a href="/">Create here</a>
                    </p>
                    </div>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(SignIn);