import React from 'react';
import Byline from './Byline';

const Bid = ({ bid, last }) => {
  console.log(last);
  return (
    <p>
      ${bid.price} placed by <Byline first_name={bid.first_name} username={bid.username} />
    </p>
  )
}

export default Bid;