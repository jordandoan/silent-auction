import React, { useState, useContext } from 'react';
import 'typeface-roboto';
import './App.css';
import { Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import UserContext from './contexts/UserContext';
import RedirectAuthRoute from './utils/RedirectAuthRoute';
import PrivateRoute from './utils/PrivateRoute';

import LandingPage from './components/LandingPage';
import Auctions from './components/Auctions';
import DetailedAuction from './components/DetailedAuction';
import AuctionForm from './components/AuctionForm';
import Dashboard from './components/Dashboard';
import Loading from './components/Loading';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [is_seller, setRole] = useState(localStorage.getItem("is_seller"));
  const User = useContext(UserContext);
  return (
    <UserContext.Provider value={{...User, token, setToken, is_seller, setRole}}>
      <div className="App">
        <NavBar />

        <Route exact path ="/" component={LandingPage} />
        <RedirectAuthRoute path="/signin" component={SignIn} />
        <RedirectAuthRoute path="/signup" component={SignUp} />
        <Route exact path="/auctions" component={Auctions} />
        <Route path="/auctions/auction/:id" component={DetailedAuction} />
        <PrivateRoute path="/auctions/add" component={AuctionForm} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
