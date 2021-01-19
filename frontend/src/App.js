import React from "react";

import { Container } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import Register from "./screens/RegisterationScreen";
import Profile from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceorderScreen from "./screens/PlaceorderScreen";
import OrderScreen from "./screens/OrderScreen";
import ListUserScreen from "./screens/UserListScreen";
import AdminUserEdit from "./screens/AdminUserEdit";
import ProductListScreen from "./screens/ProductListScreen";
import AdminOrders from "./screens/AdminOrdersScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container className="py-3">
        <main>
          <Route exact={true} path="/" component={HomeScreen} />
          <Route path="/page/:numpage" component={HomeScreen} />

          <Route exact path="/search/:keyword" component={HomeScreen} />
          <Route path="/search/:keyword/page/:numpage" component={HomeScreen} />

          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceorderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/admin/users" component={ListUserScreen} />
          <Route exact path="/admin/products" component={ProductListScreen} />
          <Route exact path="/admin/products/page/:page" component={ProductListScreen} />

          <Route path="/admin/user/:id/edit" component={AdminUserEdit} />
          <Route path="/admin/orders" component={AdminOrders} />
        </main>
      </Container>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
