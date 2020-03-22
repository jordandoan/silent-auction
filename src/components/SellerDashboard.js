import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import withWidth from '@material-ui/core/withWidth';

import isFuture from 'date-fns/isFuture';

import AuctionCard from './AuctionCard';
import TabsView from './TabsView';

const SellerDashboard = ({ width, data }) => {
  const isSmallScreen = /xs|sm/.test(width);
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
  if (isSmallScreen) return <TabsView />
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

export default withWidth()(SellerDashboard);