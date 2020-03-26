import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';

import styles from './PasswordField.module.scss';

const useStyles = makeStyles(theme => ({
  cancel: {
    marginLeft: '1%',
  },

  button: {
    background: '#32CD32',
    '&:hover': {
      background: '#006400'
    },
    color: 'white'
  }
}))

const PasswordField = ({fields, edit, type, handleChange, handleFieldView, handleSubmit}) => {
  const classes = useStyles();
  const [confirmed, setConfirm] = useState("");

  const validatePassword = (e) => {
    e.preventDefault();
    if (confirmed === fields.password) {
      handleSubmit(e, type)
    } else {
      alert('Passwords are not matching.')
    }
  }
  
  return (
    <div className={styles.main}>
      <div className={styles.fields}>
        {edit[type]
          ? 
            <>
              <div className={styles.input}>
                <TextField label="Current password" variant="outlined" name="old_password" fullWidth value={fields.old_password} onChange={handleChange} type="password"/>
              </div>
              <div className={styles.input}>
                <TextField label="New password" variant="outlined" name={type} fullWidth value={confirmed} onChange={(e) => setConfirm(e.target.value)} type="password"/>
              </div>
              <div className={styles.input}>
                <TextField label="Confirm new password" variant="outlined" name={type} fullWidth value={fields[type]} onChange={handleChange} type="password"/>
              </div>
            </>
          : ""
        }
      </div>
      <div>
        {edit[type]
          ? <>
                <Button display="block" disableRipple={true} color="inherit" variant="contained" className={classes.button} disableElevation={true} onClick={validatePassword}>Save</Button>
                <Button display="block" className={classes.cancel} color="secondary" variant="contained" disableElevation={true} onClick={() => {handleFieldView(type)}}>Cancel</Button>
            </>
          : <Button variant="contained" disableElevation={true} onClick={() => {handleFieldView(type)}}>Change Password</Button>
        }
      </div>
    </div>
  )
}

export default PasswordField;