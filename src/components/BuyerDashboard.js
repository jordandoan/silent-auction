import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';

import isFuture from 'date-fns/isFuture';
import AuctionCard from './AuctionCard';
import styles from './Dashboard.module.scss';

import TabsView from './TabsView';
const BuyerDashboard = ({ width, data }) => {
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

  if (isSmallScreen) return <TabsView auctions={auctions} />
  return (
    <div className={styles.main}>
      <div>
        <Typography variant="h5">
          Ongoing auctions
        </Typography>
        <div className={styles.map}>
          {auctions.ongoing.map(auction => <AuctionCard auction={auction} />)}
        </div>
      </div>
      <div>
        <Typography variant="h5">
          Past auctions
        </Typography>
        <div className={styles.map}>
          {auctions.past.map(auction => <AuctionCard auction={auction} />)}
        </div>
      </div>
    </div>
  )
}

export default withWidth()(BuyerDashboard);