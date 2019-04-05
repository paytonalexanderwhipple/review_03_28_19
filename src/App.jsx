import React, { Component } from 'react';
import './App.css';
import Entry from './components/Entry.jsx';
import { Route, Link, Switch } from 'react-router-dom';
import Display from './components/Display';
import Login from './components/Login';
import store from './ducks/store';
import axios from 'axios';

class App extends Component {

  state = {
    user: store.getState(),
  }

  componentDidMount = () => {
    store.subscribe(() => {
      this.setState(store.getState())
    });
  }

  render() {
    console.log(this.state.user);
    return (
      <>
        <nav style={{ background: this.state.user.color || '#333' }}>
          <div className='navMenu'>
            <li><Link to='/'>Potatos</Link></li>
            {this.state.user.isadmin && <li><Link to='/admin'>Admin</Link></li>}
          </div>
          {this.state.user.username || <li><Link className="loginLink" to='/login'>Login</Link></li>}
        </nav>
        <Switch>
          <Route path='/' exact component={Display} />
          <Route path='/admin' component={Entry} />
          <Route path='/login' component={Login} />
        </Switch>
      </>
    );
  }
}

export default App;
