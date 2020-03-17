import 'date-fns';
import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField, Typography } from '@material-ui/core/';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import withWidth from '@material-ui/core/withWidth';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Success from './Success';

import styles from './AuctionForm.module.scss';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const AuctionForm = ({ width, history, match }) => {
  const isEdit = Boolean(history.location.state);
  const [startDate, setStart] = useState(new Date());
  const [endDate, setEnd] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [fields, setFields] = useState({name: "", description: "", starting_price: 0, image: ""});
  const isSmallScreen = /xs|sm/.test(width);

  useEffect(() => {

    if (isEdit) {
      const {name, description, starting_price, image, date_starting, date_ending} = history.location.state.auction;
      setFields({name, description, starting_price, image});
      setStart(new Date(date_starting));
      setEnd(new Date(date_ending));
    }
  }, [isEdit])
  const buttonProps = {
    variant: "contained",
    color: "primary",
    className: isSmallScreen? styles['button-small'] : styles.button, 
  }

  const handleDateChange = date => {
    setStart(date);
  };

  const handleEndChange = date => {
    setEnd(date);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFields({...fields, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    setOpen(true)
    setLoading(true);
    e.preventDefault();
    let postData = {...fields, date_ending: endDate.toISOString(), date_starting: startDate.toISOString()};
    if (isEdit) {
      axiosWithAuth().put(`/api/auctions/${match.params.id}`, postData)
      .then(res => {
        setLoading(false);
        setMessage("Auction edited.")
      })
      .catch(err => {
        setOpen(false);
        alert(err.response.data.message);
      })
    } else {
      axiosWithAuth().post('/api/auctions', postData)
        .then(res => {
          setLoading(false);
          setMessage("Auction added.")
        })
        .catch(err => {
          setOpen(false);
          alert(err.response.data.message);
        })
    }
  }

  return (
    <div className={styles.container}>
      <Success setOpen={setOpen} loading={loading} open={open} url={isEdit ? `/auctions/auction/${match.params.id}`: "/auctions"}>
        {message}
      </Success>
      <Typography variant="h3">
        <Tooltip title="Go Back" onClick={() => history.goBack()}>
            <IconButton aria-label="go back" color="primary">
              <ArrowBackIcon />
            </IconButton>
        </Tooltip>
        {isEdit ? "Edit " : "Sell "} Item
      </Typography>
      <form onChange={handleChange}>
        <Grid container justify="center" direction="column" spacing={3}>
          <Grid item> 
            <TextField  className={styles.input} required variant="outlined" label="Title"placeholder="iPhone SE" name="name" value={fields.name}/>
          </Grid>
          <Grid item>
            <TextField  className={styles.input} required type="number" variant="outlined" label="Price" placeholder={"150"}  name="starting_price" value={fields.starting_price}/>
          </Grid>
          <Grid item>
            <TextField  className={styles.input} multiline={true} variant="outlined" label="Description" placeholder="A beautiful iPhone!"  name="description" value={fields.description}/>
          </Grid>
          <Grid item>
            <TextField  className={styles.input} required variant="outlined" label="Image URL" placeholder="https://...."  name="image" value={fields.image}/>
          </Grid>
        </Grid>
      </form>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} lg={2}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              label="Start date"
              value={startDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
          <Grid item xs={12} lg={2}>
            <KeyboardTimePicker
              margin="normal"
              label="Start time"
              value={startDate}
              onChange={handleDateChange}
              size="small"
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} lg={2}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              label="End date"
              value={endDate}
              onChange={handleEndChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
          <Grid item xs={12} lg={2}>
            <KeyboardTimePicker
              margin="normal"
              label="End time"
              value={endDate}
              onChange={handleEndChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
      <Button {...buttonProps} onClick={handleSubmit}>
        { isEdit ? "Save Changes" : "Submit" }
      </Button>
    </div>
  )
}

export default withWidth()(AuctionForm);