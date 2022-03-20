import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import Register from './pages/Register';
import Products from './pages/Products';
import Orders from './pages/Orders';
import queryClient from './react-query/queryClient';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Administrator from './pages/Administrator';
import Header from './components/Header';
import OrderDetails from './pages/OrderDetails';
import SellerOrders from './pages/SellerOrders';
import SellerOrdersDetails from './pages/SellerOrdersDetails';
// import './index.css';

function App() {
  return (
    <Switch>
      <QueryClientProvider client={ queryClient }>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route exact path="/admin/manage" component={ Administrator } />
        <Route exact path="/seller/orders" component={ SellerOrders } />
        <Route
          exact
          path="/seller/orders/:id"
          component={ SellerOrdersDetails }
        />
        <Route path="/customer">
          <Header />
          <Route exact path="/customer/orders" component={ Orders } />
          <Route exact path="/customer/orders/:realAndFakeId" component={ OrderDetails } />
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/customer/checkout" component={ Checkout } />
        </Route>
      </QueryClientProvider>
    </Switch>
  );
}
export default App;
