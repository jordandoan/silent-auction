import React, { useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import UserContext from '../contexts/UserContext';
import BuyerDashboard from './BuyerDashboard';
import SellerDashboard from './SellerDashboard';

const Dashboard = () => {
  const [data, setData] = useState();
  const User = useContext(UserContext);

  useEffect(() => {
    axiosWithAuth().get('/api/users/')
      .then(res => {
        console.log(res.data);
        let newRole = res.data.role === "seller";
        localStorage.setItem('is_seller', newRole);
        setData(res.data);
        User.setRole(newRole);
      })
      .catch(err => {
        console.log(err.response);
      })
  }, [])

  if (!data) return <div>Loading...</div>
  return (
    <div>
      Welcome, {data.first_name} {data.last_name} ({User.token && (User.is_seller ? "Seller" : "Buyer")})
      {User.is_seller && <SellerDashboard data={data} />}
      {!User.is_seller && <BuyerDashboard data={data} />}
    </div>
  )
}

export default Dashboard;