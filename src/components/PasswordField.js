import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const PasswordField = ({data, fields, edit, type, handleChange, handleFieldView, handleSubmit}) => {

  return (
    <div>
      <div>
        {edit[type]
          ? <>
              <button onClick={(e) => {handleSubmit(e, type)}}>Save</button>
              <button onClick={() => {handleFieldView(type)}}>Cancel</button>
            </>
          : <button onClick={() => {handleFieldView(type)}}>Change Password</button>
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