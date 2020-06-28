import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignUp from './containers/sign-up';
import SignIn from './containers/sign-in';
import ChatRoom from './containers/chat-room';

const AllRoute = (props) => {
  debugger
    return (
        <Router>
          <Switch>

            <Route exact path="/" component={SignUp} />

            <Route exact path="/sign-in" component={SignIn} />

            <Route exact path="/chat-room" component={ChatRoom} />

          </Switch>
        </Router>
    )
}

export default AllRoute;
