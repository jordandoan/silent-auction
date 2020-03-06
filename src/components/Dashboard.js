import React, { useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import UserContext from '../contexts/UserContext';
import BuyerDashboard from './BuyerDashboard';
import SellerDashboard from './SellerDashboard';

const Dashboard = () => {
  const [data, setData] = useState();
  const [role, setRole] = useState(localStorage.getItem('is_seller'));
  const User = useContext(UserContext);

  useEffect(() => {
    axiosWithAuth().get('/api/users/')
      .then(res => {
        console.log(res.data);
        let newRole = res.data.role === "seller";
        localStorage.setItem('is_seller', newRole);
        User.is_seller = localStorage.getItem('is_seller');
        setData(res.data);
        setRole(newRole);
      })
      .catch(err => {
        console.log(err.response);
      })
  }, [])

  if (!data) return <div>Loading...</div>
  return (
    <div>
      Welcome, {data.first_name} {data.last_name} ({User.token && (role ? "Seller" : "Buyer")})
      {role && <SellerDashboard data={data} />}
      {!role && <BuyerDashboard data={data} />}
    </div>
  )
}

export default Dashboard;