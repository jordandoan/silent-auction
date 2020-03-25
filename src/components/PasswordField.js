import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';

import styles from './PasswordField.module.scss';

const useStyles = makeStyles(theme => ({
  button: {
    background: '#32CD32'
  }
}))

const PasswordField = ({fields, edit, type, handleChange, handleFieldView, handleSubmit}) => {
  const classes = useStyles();

  return (
    <div className={styles.main}>
      <div>
        {edit[type]
          ? <>
              <Button disableRipple={true} color="inherit" variant="contained" className={classes.button} disableElevation={true} onClick={(e) => {handleSubmit(e, type)}}>Save</Button>
              <Button color="secondary" variant="contained" disableElevation={true} onClick={() => {handleFieldView(type)}}>Cancel</Button>
            </>
          : <Button variant="contained" disableElevation={true} onClick={() => {handleFieldView(type)}}>Change Password</Button>
        }
      </div>
      <div>
        {edit[type]
          ? 
            <>
              <input name="old_password" value={fields.old_password} onChange={handleChange} type="password" placeholder="Current password"/>
              {/* <input type="password" placeholder="New password"/> */}
              <input name={type} value={fields[type]} onChange={handleChange} type="password" placeholder="Confirm new password"/>
            </>
          : ""
        }
      </div>
    </div>
  )
}

export default PasswordField;