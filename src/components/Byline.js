import React from 'react';

const Byline = ({first_name, username}) => {
  return (
    <>
      {first_name} @<span>{username}</span>
    </>
  )
}

export default Byline;