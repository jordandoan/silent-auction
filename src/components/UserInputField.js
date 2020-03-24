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
        {header[type]}:
      </div>
      <div>
        {edit[type]
          ? <input name={type} value={fields[type]} onChange={handleChange}/>
          : <span>{data[type]}</span>
        }
      </div>
      <div>
        {edit[type]
          ? 
            <>
              <button onClick={(e) => {handleSubmit(e, type)}}>Save</button>
              <button onClick={() => {handleFieldView(type)}}>Cancel</button>
            </>
          : <button onClick={()=>{handleFieldView(type)}}>Edit</button>
        }
      </div>
    </div>
  )

}

export default UserInputField;