import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import Register from './pages/Register';
import './App.css';
import Products from './pages/Products';
import queryClient from './react-query/queryClient';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Administrator from './pages/Administrator';
import Header from './components/Header';
function App() {
  return (
    <Switch>
      <QueryClientProvider client={ queryClient }>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/customer/products" component={ Products } />
        <Route exact path="/checkout" component={ Checkout } />
        <Route exact path="/admin/manage" component={ Administrator } />
        <Route path="/customer">
          <Header />
          <Switch>
            <Route path="/customer/products" component={ Products } />
            <Route path="/customer/checkout" component={ Checkout } />
          </Switch>
        </Route>
      </QueryClientProvider>
    </Switch>
  );
}
export default App;
