import React, { useState, useEffect } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import isFuture from 'date-fns/isFuture';
import { Container, Grid, Paper, Button, FormControl, OutlinedInput, InputLabel } from '@material-ui/core/';

import BidInfo from './BidInfo';
import Byline from './Byline';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const DetailedAuction = ({ history, match, location}) => {
  const [auction, setAuction] = useState({});
  const [timeLeft, setTime] = useState([false, 0]);

  useEffect(() => {
    axiosWithAuth().get(`api/auctions/${match.params.id}`)
      .then(res => {
        setAuction(res.data)
        let arr = [true, 0];
        let end = new Date(res.data.date_ending);
        if (!isFuture(end)) {
          arr[0] = false;
        }
        arr[1] = formatDistanceToNow(end);
        setTime(arr);
      })
  }, [match.params.id])

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>{auction.name}</h2>
          <img style={{width: '30%'}} src={auction.image} />
          <p>{auction.description}</p>
          <p>Sold by <Byline first_name={auction.first_name} username={auction.seller} /></p>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={3}>
            <h3> Info </h3>
            <p>
              <span>Price:</span>
              <span>
                ${`${auction.starting_price} `}
              </span>
              
              <span>
                {auction.bids && auction.bids.length ? `$${auction.bids[auction.bids.length - 1]['price']} ` : ""}
                {timeLeft[0] ? timeLeft[1] : "Auction has ended!"}
              </span>
            </p>
            <p>Start date: {new Date(auction.date_starting).toString().substring(0,21)}</p>
            <p>End date: {new Date(auction.date_ending).toString().substring(0,21)}</p>
            <div>
              <h4>Bid History</h4>
              {auction.bids && auction.bids.map((bid, i) => <BidInfo key={i} last={i === auction.bids.length - 1} bid={bid}/>)}
            </div>
            <FormControl variant="outlined">
              <InputLabel htmlFor="component-outlined">Price</InputLabel>
              <OutlinedInput id="component-outlined" label="Name" placeholder="200"/>
            </FormControl>
            <Button variant="contained" color="primary" disabled={!timeLeft[0]}>
              Place bid
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default DetailedAuction;