import React, { useState, useEffect } from 'react';
import { Container, Grid, FormRow } from '@material-ui/core/';

import { axiosWithAuth } from '../utils/axiosWithAuth';

const DetailedAuction = ({ history, match, location}) => {
  const [auction, setAuction] = useState({})
  useEffect(() => {
    axiosWithAuth().get(`api/auctions/${match.params.id}`)
      .then(res => {
        setAuction(res.data)
      })
  }, [])
  console.log(auction);
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>{auction.name}</h2>
          <img style={{width: '30%'}} src={auction.image} />
          <p>{auction.description}</p>
          <p>Sold by {auction.first_name} @<span>{auction.seller}</span></p>
        </Grid>
        <Grid item xs={3}>
          <p>
            <span>
              {auction.starting_price}
            </span>
            <span>
              {auction.bids && auction.bids.length ? auction.bids[auction.bids.length - 1]['price'] : ""}
            </span>
          </p>
          <p>{auction.starting_date}</p>
          <p>{auction.ending_date}</p>
        </Grid>
      </Grid>
    </Container>
  )
}

export default DetailedAuction;