import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Trybe!</h1>
      <Switch>
        <Route exact path={ ['/', '/home'] } />
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
