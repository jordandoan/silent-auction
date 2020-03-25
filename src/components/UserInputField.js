import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styles from './UserInput.module.scss';

const UserInputField = ({data, fields, edit, type, handleChange, handleFieldView, handleSubmit}) => {

  const header = {
    username: 'Username',
    first_name: 'First Name',
    last_name: 'Last Name'
  }

  return (
    <Grid container justify="space-between" md={8} className={styles.main}>
      <Grid item xs={3}>
        {header[type]}:
      </Grid>
      <Grid item xs={6}>
        {edit[type]
          ? <input name={type} value={fields[type]} onChange={handleChange}/>
          : <span>{data[type]}</span>
        }
      </Grid>
      <Grid item xs={3}>
        {edit[type]
          ? 
            <>
              <Typography variant="subtitle2" display="initial" className={styles.button} onClick={(e) => {handleSubmit(e, type)}}>Save</Typography>
              <Typography variant="subtitle2" display="initial" className={styles.button} onClick={() => {handleFieldView(type)}}>Cancel</Typography>
            </>
          : <Typography variant="subtitle2" display="initial" className={styles.button} onClick={()=>{handleFieldView(type)}}>Edit</Typography>
        }
      </Grid>
    </Grid>
  )

}

export default UserInputField;