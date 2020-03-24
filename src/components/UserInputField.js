import React from 'react';
const UserInputField = ({data, fields, edit, type, handleChange, handleFieldView, handleSubmit}) => {

  const header = {
    username: 'Username',
    first_name: 'First Name',
    last_name: 'Last Name'
  }

  return (
    <div>
      <div>
        {header[type]}
      </div>
      {edit[type]
      ? <input name={type} value={fields[type]} onChange={handleChange}/>
      : <p>{data[type]} <button onClick={()=>{handleFieldView(type)}}>Edit</button></p>
      }
    </div>
  )

}

export default UserInputField;