import React from 'react';

const Auctions = (props) => {
  const auctions = [{
    name: "Iphone"
  },
  {
    name:"Android phone"
  }
]
  return (
    <div>
      {auctions.map(auction => 
        <div>
          {auction.name}
        </div>
          )}
    </div>
  )
}

export default Auctions;