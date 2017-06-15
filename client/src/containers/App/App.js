import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from 'containers/Home/Home.js';

export default () => (
  <div>
    <main>
      <Route path="/" render={(props) =>
        <Home {...props}>
          <Route path="/login/:token?" render={(props) => {
            return (<Redirect to={{
              pathname: "/",
              token: props.match.params.token
            }}/>)
          }}/>
        </Home>
      }/>
    </main>
  </div>
)