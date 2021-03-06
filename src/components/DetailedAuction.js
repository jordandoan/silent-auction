import React, { useState, useEffect } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import isFuture from 'date-fns/isFuture';
import { Container, Grid, Paper, Button, TextField } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';

import BidInfo from './BidInfo';

import Success from './Success';

import DetailedAuctionInfo from './DetailedAuctionInfo';

import { axiosWithAuth } from '../utils/axiosWithAuth';


const DetailedAuction = ({ history, match, location}) => {
  // {history.location.pathname}
  const [auction, setAuction] = useState({});
  const [timeLeft, setTime] = useState([false, 0]);
  const [lastPrice, setPrice] = useState(0);
  const [bidPrice, setBid] = useState(0);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
        let price = res.data.starting_price;
        if (res.data.bids.length) {
          price = res.data.bids[res.data.bids.length - 1]['price'];
        }
        setPrice(price);
      })
  }, [match.params.id])

  const handleChange = (e) => {
    e.preventDefault();
    setBid(e.target.value);
  }

  const handleSubmit = (e) => {
    setLoading(true);
    setOpen(true);
    e.preventDefault();
    axiosWithAuth().post(`/api/bids/${auction.id}`, {price: bidPrice})
      .then(res => {
        setLoading(false);
      })
      .catch(err => {
        setOpen(false);
        console.log(err.response);
      })
  }

  return (
    <Container>
      <Success open={open} loading={loading} setOpen={setOpen} url="/auctions">
        {message}
      </Success>
      <Grid container justify="center" spacing={4}>
        <Grid item xs={8} lg={3}>
          <DetailedAuctionInfo auction={auction} history={history} />
        </Grid>
        <Grid item xs={8} lg={3}>
          <Paper elevation={3}>
            <h3> Info </h3>
            <p>
              <span>Price: </span>
              {/* <span>
                ${`${auction.starting_price} `}
              </span> */}
              
              <span>
                ${lastPrice}
              </span>
              <p>
                Ends in: {timeLeft[0] ? timeLeft[1] : "Auction has ended!"}
              </p>
            </p>
            <p>Start date: {new Date(auction.date_starting).toString().substring(0,21)}</p>
            <p>End date: {new Date(auction.date_ending).toString().substring(0,21)}</p>
            <div>
              <h4>Bid History</h4>
              {auction.bids && auction.bids.map((bid, i) => <BidInfo key={i} last={i === auction.bids.length - 1} bid={bid}/>)}
            </div>
            <TextField required type="number" variant="outlined" label="Price" placeholder={"150"}  name="bid" onChange={handleChange} />
            <Button variant="contained" color="primary" disabled={!timeLeft[0] || bidPrice <= lastPrice} onClick={handleSubmit}>
              Place bid
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default DetailedAuction;