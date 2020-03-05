import React, { useState, useContext } from 'react';
import 'typeface-roboto';
import './App.css';
import { Route, useHistory } from 'react-router-dom';

import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import UserContext from './contexts/UserContext';
import RedirectAuthRoute from './utils/RedirectAuthRoute';
import Auctions from './components/Auctions';
import DetailedAuction from './components/DetailedAuction';
import AuctionForm from './components/AuctionForm';

function App() {
  const history = useHistory();
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <UserContext.Provider value={{token, setToken}}>
      <div className="App">
        <NavBar />
        <button onClick={() => {history.push("/auctions")}}>View auctions</button>
        <RedirectAuthRoute path="/signin" component={SignIn} />
        <RedirectAuthRoute path="/signup" component={SignUp} />
        <Route exact path="/auctions" component={Auctions} />
        <Route path="/auctions/auction/:id" component={DetailedAuction} />
        <Route path="/auctions/add" component={AuctionForm} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
