import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const UserSettings = () => {
  const [data, setData] = useState({});
  const [fields, setFields] = useState({})
  useEffect(() => {
    axiosWithAuth().get('/api/settings')
      .then(res => {
        setData(res.data);
        const { first_name, last_name, username } = res.data
        setFields({first_name, last_name, username})
      })
      .catch(err => {
        console.log(err.response.data);
      })
  }, [])

  const handleChange = (e) => {
    setFields({...fields, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth().put('/api/settings', fields)
  }
  return (
    <div>
      <h2>Settings</h2>
      <p>Role: {data.is_seller ? "Seller" : "Buyer"}</p>
      <p>Username: {data.username} </p>
      <p>First Name: {data.first_name}</p>
      <p>Last Name: {data.last_name}</p>
      <p>Change password</p>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <input name="first_name" value={fields.first_name}/>
        <input name="last_name" value={fields.last_name}/>
        <input name="username" value={fields.username}/>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default UserSettings;