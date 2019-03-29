import React, { Component } from 'react';
import './App.css';
import Entry from './components/Entry.jsx';
import { Route, Link, Switch } from 'react-router-dom';
import Display from './components/Display';

class App extends Component {

  state = {
  }

  render() {
    return (
      <>
        <nav>
          <li><Link style={{ textDecoration: 'none', color: 'white' }} to='/'>Products</Link></li>
          <li><Link style={{ textDecoration: 'none', color: 'white' }} to='/admin'>Admin</Link></li>
        </nav>
        <Switch>
          <Route path='/' exact component={Display} />
          <Route path='/admin' component={Entry} />
        </Switch>
      </>
    );
  }
}

export default App;
