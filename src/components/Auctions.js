import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import isFuture from 'date-fns/isFuture';

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
  
  const handleSlider = () => {
    setView(!viewAll);
  }
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
      <Grid></Grid>
      <div className={styles.container}>
        {
          viewAll 
            ? data.map(auction => <AuctionCard auction={auction} />) 
            : current.map(auction => <AuctionCard auction={auction} />)
        }
      </div>
      <Grid container>
        <Grid item>
          <Typography>
            View All
          </Typography>
        </Grid>
        <Grid item>
          <Switch 
            checked={!viewAll} 
            onChange={handleSlider}
          />
        </Grid>
        <Grid item>
          <Typography>
            View current
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default Auctions;