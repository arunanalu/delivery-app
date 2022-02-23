import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import Register from './pages/Register';
import './App.css';
import Products from './pages/Products';
import queryClient from './react-query/queryClient';

function App() {
  return (
    <Switch>
      <QueryClientProvider client={ queryClient }>
        <Route exact path={ ['/', '/home'] } />
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/customer/products">
          <Products />
        </Route>
      </QueryClientProvider>
    </Switch>
  );
}

export default App;
