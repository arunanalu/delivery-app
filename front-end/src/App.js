import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import Register from './pages/Register';
import './App.css';
import Products from './pages/Products';
import queryClient from './react-query/queryClient';
import Login from './pages/Login';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Switch>
      <QueryClientProvider client={ queryClient }>
        <Route exact path={ ['/', '/login'] } component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/customer/products" component={ Products } />
        <Route exact path="/checkout" component={ Checkout } />
      </QueryClientProvider>
    </Switch>
  );
}
export default App;
