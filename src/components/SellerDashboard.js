import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import isFuture from 'date-fns/isFuture';

import AuctionCard from './AuctionCard';

const SellerDashboard = ({ data }) => {
  const [auctions, setAuctions] = useState({ongoing: [], past: []})

  useEffect(() => {
    let ongoing = [];
    let past = [];
    data.auctions.forEach(auction => {
      if (isFuture(new Date(auction.date_ending))) {
        ongoing.push(auction);
      } else {
        past.push(auction);
      }
    })
    setAuctions({ongoing, past});
  }, [])
  return (
    <div>
        <p>Ongoing auctions</p>
        <Grid container spacing={7}>
          {auctions.ongoing.map(auction => <AuctionCard auction={auction} />)}
        </Grid>
        <p>Past auctions</p>
        <Grid container spacing={7}>
          {auctions.past.map(auction => <AuctionCard auction={auction} />)}
        </Grid>
    </div>
  )
}

export default SellerDashboard;