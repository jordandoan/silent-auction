import 'date-fns';
import React, { useState } from 'react';
import { Grid, Button, TextField, Typography } from '@material-ui/core/';
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

const AuctionForm = ({ width, history }) => {
  const [startDate, setStart] = useState(new Date());
  const [endDate, setEnd] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [fields, setFields] = useState({name: "", description: "", starting_price: 0, image: ""});
  const isSmallScreen = /xs|sm/.test(width);

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
    axiosWithAuth().post('/api/auctions', postData)
      .then(res => {
        setLoading(false);
        setMessage("Auction added.")
      })
      .catch(err => {
        setLoading(false);
        // alert(err.response.data.message);
      })
  }

  return (
    <div className={styles.container}>
      <Success loading={loading} open={open} url={"/auctions"}>
        {message}
      </Success>
      <Typography variant="h3">
        Sell Item
      </Typography>
      <form onChange={handleChange}>
        <Grid container justify="center" direction="column" spacing={3}>
          <Grid item> 
            <TextField  className={styles.input} required variant="outlined" label="Title"placeholder="iPhone SE" name="name"/>
          </Grid>
          <Grid item>
            <TextField  className={styles.input} required type="number" variant="outlined" label="Price" placeholder={"150"}  name="starting_price"/>
          </Grid>
          <Grid item>
            <TextField  className={styles.input} multiline={true} variant="outlined" label="Description" placeholder="A beautiful iPhone!"  name="description"/>
          </Grid>
          <Grid item>
            <TextField  className={styles.input} required variant="outlined" label="Image URL" placeholder="https://...."  name="image"/>
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
        Submit
      </Button>
    </div>
  )
}

export default withWidth()(AuctionForm);