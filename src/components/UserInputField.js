import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';
import styles from './UserInput.module.scss';

const UserInputField = ({data, fields, edit, type, handleChange, handleFieldView, handleSubmit}) => {

  const header = {
    username: 'Username',
    first_name: 'First Name',
    last_name: 'Last Name'
  }

  return (
    <Grid container justify="space-around" md={8} className={styles.main} alignItems="center">
      <Grid item xs={3} className={styles.title}>
        <Typography align="left" variant="overline">{header[type]}:</Typography>
      </Grid>
      <Grid item xs={6} className={styles.test}>
        {edit[type]
          ? <TextField fullWidth={true} className={styles.test} name={type} value={fields[type]} onChange={handleChange}/>
          : <Typography align="left">{data[type]}</Typography>
        }
      </Grid>
      <Grid item xs={3} align="right">
        {edit[type]
          ? 
            <>
              <Typography  color="textSecondary" variant="subtitle2" display="initial" className={styles.button} onClick={(e) => {handleSubmit(e, type)}}>Save</Typography>
              <Typography  color="textSecondary" variant="subtitle2" display="initial" className={styles.button} onClick={() => {handleFieldView(type)}}>Cancel</Typography>
            </>
          : <Typography  color="textSecondary" variant="subtitle2" display="initial" className={styles.button} onClick={()=>{handleFieldView(type)}}>Edit</Typography>
        }
      </Grid>
    </Grid>
  )

}

export default UserInputField;