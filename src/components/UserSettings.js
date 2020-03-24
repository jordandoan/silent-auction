import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';

import UserInputField from './UserInputField';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const UserSettings = () => {
  const [data, setData] = useState({});
  const [edit, setEdit] = useState({
    first_name: false,
    last_name: false,
    password: false,
    username: false
  })
  const [fields, setFields] = useState({first_name: "", last_name: "", username: ""})
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

  const handleFieldView = (field) => {
    setEdit({...edit, [field]: !edit[field]})
  }
  const sendProps = (type) => {
    return {
      handleChange,
      handleFieldView,
      fields,
      data,
      edit,
      type: type
    }
  }
  return (
    <Paper elevation={10}>
      <Typography variant="h4"><SettingsIcon/> Settings</Typography>
      <p>Role: {data.is_seller ? "Seller" : "Buyer"}</p>
      <UserInputField {...sendProps('username')} />
      <p>First Name: {data.first_name}</p>
      <p>Last Name: {data.last_name}</p>
      <p>Change password</p>
      <p>Delete Account</p>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <input name="first_name" value={fields.first_name}/>
        <input name="last_name" value={fields.last_name}/>
        <input name="username" value={fields.username}/>
        <button>Submit</button>
      </form>
    </Paper>
  )
}

export default UserSettings;