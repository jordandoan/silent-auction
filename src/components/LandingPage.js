import React from 'react';
import { Typography } from '@material-ui/core';
import splash from '../images/splash.jpg';

import styles from './LandingPage.module.scss';
const LandingPage = () => {
  return (
    <div>
      <img src={splash} className={styles.image} alt="plant" />
      <div className={styles.container}>
        <Typography variant="h1">
          Silent Auction.
        </Typography>
        <Typography variant="h5">
          Bid. Buy. Win.
        </Typography>
      </div>
    </div>
  )
}

export default LandingPage;