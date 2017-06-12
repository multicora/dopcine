import React from 'react';
import { Route } from 'react-router-dom'
import Home from 'containers/Home/Home.js'

    // <header>
    //   <Link to="/">Home</Link>
    //   <Link to="/about-us">About</Link>
    // </header>
export default () => (
  <div>
    <main>
      <Route exact path="/" component={Home} />
    </main>
  </div>
)