import React, { useState, useEffect } from 'react';
import AuctionCard from './AuctionCard';
import isFuture from 'date-fns/isFuture';
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
      <div>
        Ongoing auctions
        {auctions.ongoing.map(auction => <AuctionCard auction={auction} />)}
      </div>
      <div>
        Past auctions
        {auctions.past.map(auction => <AuctionCard auction={auction} />)}
      </div>
    </div>
  )
}

export default SellerDashboard;