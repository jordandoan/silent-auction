import React, { useState, useEffect, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import UserInputField from './UserInputField';
import PasswordField from './PasswordField';
import Loading from './Loading';

import { axiosWithAuth } from '../utils/axiosWithAuth';
import UserContext from '../contexts/UserContext';

import styles from './UserSettings.module.scss';

const UserSettings = ({ history }) => {
  const User = useContext(UserContext);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState([true, ""])
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
    setLoading(true)
    axiosWithAuth().get('/api/settings')
      .then(res => {
        let newData = res.data;
        newData.is_seller = res.data.is_seller ? "Seller" : "Buyer";
        setData(newData);
        const { first_name, last_name, username } = res.data
        setLoading(false)
        setFields({...fields, first_name, last_name, username})
      })
      .catch(err => {
        console.log(err.response.data);
      })
  }, [])

  const handleChange = (e) => {
    setFields({...fields, [e.target.name]: e.target.value})
  }

  const validSubmission = type => {
    return Boolean(fields[type])
  }

  const handleSubmit = (e, type) => {
    e.preventDefault();
    let putData = {};
    if (validSubmission(type)) {
      if (type === 'password') {
        putData.password = fields.password;
        putData.old_password = fields.old_password;
      } else {
        putData[type] = fields[type];
      }
      axiosWithAuth().put('/api/settings', putData)
        .then(res => {
          setData({...data, [type]: fields[type]});
          handleFieldView(type)
          setMessage([false, "Succesfully saved."])
        })
        .catch(err => {
          setMessage([true, err.response.data.message])
        })
    } else {
      setMessage([true, 'Blank Field']);
    }

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
    // axiosWithAuth().delete('/api/settings')
    //   .then(() => {
    //     localStorage.clear();
    //     User.setToken(null)
    //     history.push('/');
    //   })
  }

  if (loading) return <Loading>Loading User Info...</Loading>
  return (
    <Grid container justify="center">
      <Grid item xs={10} md={4}>
        <Paper elevation={10} className={styles.paper}>
          <Typography variant="h4"><SettingsIcon/> Settings</Typography>
          <Typography color={message[0] ? "error" : ""} variant="error">{message[1]}</Typography>
          <div className={styles.fields}>
            <UserInputField {...sendProps('is_seller')} sellerRole={true}/>
            <UserInputField {...sendProps('username')} />
            <UserInputField {...sendProps('first_name')} />
            <UserInputField {...sendProps('last_name')} />
            <PasswordField {...sendProps('password')} />
            <Button color="secondary" variant="contained" onClick={handleDelete}>Delete Account</Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default UserSettings;