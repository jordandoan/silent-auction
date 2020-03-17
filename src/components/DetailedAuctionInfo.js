import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import isFuture from 'date-fns/isFuture';
import EditIcon from '@material-ui/icons/Edit';

import Success from './Success';
import Byline from './Byline';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const AuctionInfo = ({ auction, history }) => {
  const [open, setOpen] = useState(false);
  const username = localStorage.getItem('username');
  const [loading, setLoading] = useState(false);
  const [called, setCalled] = useState(false);
  const owner = username === auction.seller;
  const toggleDialog = () => {
    setOpen(!open);
  }

  const handleEdit = () => {
    const path = history.location.pathname;
    history.push({
      pathname: `${path}/edit`,
      state: { auction }
    })
  }
  const handleDelete = () => {
    setLoading(true);
    setCalled(true);
    setOpen(false);
    axiosWithAuth().delete(`api/auctions/${auction.id}`)
      .then(res => {
        setLoading(false);
      })
      .catch(err => {
        console.log(err.response.data)
      });
  }
  return (
    <Paper>
      <Success url="/auctions" loading={loading} open={called} setOpen={setLoading}>
        Auction deleted.
      </Success>
      <Dialog
        open={open}
        onClose={toggleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      > 
        <DialogTitle id="alert-dialog-title">{"Delete auction?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot undo this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions> 
      </Dialog>
      <h2>{auction.name}</h2>
      <img style={{width: '30%'}} src={auction.image} />
      <p>{auction.description}</p>
      <p>Sold by <Byline first_name={auction.first_name} username={auction.seller} /></p>
      { owner && isFuture(new Date(auction.date_ending)) && !auction.bids.length ?  
        <Tooltip title="Edit" onClick={handleEdit}>
          <IconButton aria-label="delete" color="primary">
            <EditIcon />
          </IconButton>
        </Tooltip>
      : ""
      }
      {owner && isFuture(new Date(auction.date_ending)) ? 
        <Tooltip title="Delete">
          <IconButton aria-label="delete" color="secondary" onClick={toggleDialog}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      : ""}
  </Paper>
  )

}

export default AuctionInfo;