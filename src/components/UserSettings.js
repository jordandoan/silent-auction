import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const UserSettings = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axiosWithAuth().get('/api/settings')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
      })
  }, [])

  return (
    <div>
      <h2>Settings</h2>
      <p>Role: {data.is_seller ? "Seller" : "Buyer"}</p>
      <p>Username: {data.username} </p>
      <p>First Name: {data.first_name}</p>
      <p>Last Name: {data.last_name}</p>
    </div>
  )
}

export default UserSettings;