import React, { useState, useEffect, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';

import UserInputField from './UserInputField';
import PasswordField from './PasswordField';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import UserContext from '../contexts/UserContext';

const UserSettings = ({ history }) => {
  const User = useContext(UserContext);
  const [data, setData] = useState({});
  const [edit, setEdit] = useState({
    first_name: false,
    last_name: false,
    password: false,
    username: false
  })

  const [fields, setFields] = useState({
    first_name: "", 
    last_name: "", 
    username: "", 
    password: "", 
    old_password: ""
  })

  useEffect(() => {
    axiosWithAuth().get('/api/settings')
      .then(res => {
        setData(res.data);
        const { first_name, last_name, username } = res.data
        setFields({...fields, first_name, last_name, username})
      })
      .catch(err => {
        console.log(err.response.data);
      })
  }, [])

  const handleChange = (e) => {
    setFields({...fields, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e, type) => {
    e.preventDefault();
    let putData = {};
    if (type === 'password') {
      putData.password = fields.password;
      putData.old_password = fields.old_password;
    } else {
      putData[type] = fields[type];
    }
    console.log(putData);
    axiosWithAuth().put('/api/settings', putData)
      .then(res => {
        setData({...data, [type]: fields[type]});
        handleFieldView(type)
      })
  }

  const handleFieldView = (type) => {
    setEdit({...edit, [type]: !edit[type]})
  }

  const sendProps = (type) => {
    return {
      handleChange,
      handleFieldView,
      handleSubmit,
      fields,
      data,
      edit,
      type: type,
    }
  }

  const handleDelete = (e) => {
    e.preventDefault();
    axiosWithAuth().delete('/api/settings')
      .then(() => {
        localStorage.clear();
        User.setToken(null)
        history.push('/');
      })
  }
  return (
    <Grid container justify="center">
      <Grid item xs={10}>
        <Paper elevation={10}>
          <Typography variant="h4"><SettingsIcon/> Settings</Typography>
          <p>Role: {data.is_seller ? "Seller" : "Buyer"}</p>
          <UserInputField {...sendProps('username')} />
          <UserInputField {...sendProps('first_name')} />
          <UserInputField {...sendProps('last_name')} />
          <PasswordField {...sendProps('password')} />
          <p onClick={handleDelete}>Delete Account</p>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default UserSettings;