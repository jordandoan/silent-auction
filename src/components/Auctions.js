import React, { useState, useEffect } from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import AuctionCard from './AuctionCard';

import { axiosWithAuth } from '../utils/axiosWithAuth';

import styles from './Auctions.module.scss';

const Auctions = (props) => {
  const history = useHistory();
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

  if (loading) return <CircularProgress />

  return (
    <div>
      <div className={styles.container}>
        {data.map(auction => 
          <AuctionCard auction={auction} />  
        )}
      </div>
    </div>
  )
}

export default Auctions;