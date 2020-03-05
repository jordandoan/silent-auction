import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';

import AuctionCard from './AuctionCard';

import { axiosWithAuth } from '../utils/axiosWithAuth';

import styles from './Auctions.module.scss';

const Auctions = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosWithAuth().get('/api/auctions')
      .then(res => {
        setTimeout(() =>{
          setData(res.data);
          setLoading(false);
        }, 750)
      })
      .catch(err => {
        console.log(err);
      });
  }, [])
  const auctions = [{
    name: "Iphone"
  },
  {
    name:"Android phone"
  }
]
  if (loading) return <CircularProgress />
  return (
    <div className={styles.container}>
      {data.map(auction => 
        <AuctionCard auction={auction} />  
      )}
    </div>
  )
}

export default Auctions;