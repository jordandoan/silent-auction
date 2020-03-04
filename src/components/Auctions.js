import React, { useState, useEffect } from 'react';

import AuctionCard from './AuctionCard';

import { axiosWithAuth } from '../utils/axiosWithAuth';

const Auctions = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosWithAuth().get('/api/auctions')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [])
  console.log(data);
  const auctions = [{
    name: "Iphone"
  },
  {
    name:"Android phone"
  }
]
  return (
    <div>
      hi
      {data.map(auction => 
        <AuctionCard auction={auction} />  
      )}
    </div>
  )
}

export default Auctions;