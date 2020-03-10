import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import isFuture from 'date-fns/isFuture';
import Button from '@material-ui/core/Button';

import { useHistory } from 'react-router-dom';

import AuctionCard from './AuctionCard';

import { axiosWithAuth } from '../utils/axiosWithAuth';

import styles from './Auctions.module.scss';

const Auctions = (props) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState([]);
  const [viewAll, setView] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosWithAuth().get('/api/auctions')
      .then(res => {
        setTimeout(() =>{
          setData(res.data);
          setLoading(false);
          const filtered = res.data.filter(auction =>
            isFuture(new Date(auction.date_ending))
          )
          setCurrent(filtered);
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
        {
          viewAll 
            ? data.map(auction => <AuctionCard auction={auction} />) 
            : current.map(auction => <AuctionCard auction={auction} />)
        }
      </div>
    </div>
  )
}

export default Auctions;