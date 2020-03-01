import React, { useState, useContext } from 'react';
import 'typeface-roboto';
import './App.css';
import { Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Test from './components/Test';
import UserContext from './contexts/UserContext';
import RedirectAuthRoute from './utils/RedirectAuthRoute';


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <UserContext.Provider value={{token, setToken}}>
      <div className="App">
        <RedirectAuthRoute path="/signin" component={SignIn} />
        <RedirectAuthRoute path="/signup" component={SignUp} />
        <Route path="/" component={Test} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
