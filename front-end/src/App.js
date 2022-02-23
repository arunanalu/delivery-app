import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from './pages/Register';
import './App.css';
import Products from './pages/Products';

function App() {
  return (
    <Switch>
      <Route exact path={ ['/', '/home'] } />
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/customer/products">
        <Products />
      </Route>
    </Switch>
  );
}

export default App;
