import 'date-fns';
import React, { useState } from 'react';
import { Grid, Button, TextField } from '@material-ui/core/';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { axiosWithAuth } from '../utils/axiosWithAuth';

const AuctionForm = () => {
  const [startDate, setStart] = useState(new Date());
  const [endDate, setEnd] = useState(new Date(new Date().setDate(new Date().getDay() + 8)));
  const [fields, setFields] = useState({name: "", description: "", starting_price: 0, image: ""});
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
    e.preventDefault();
    let postData = {...fields, date_ending: endDate.toISOString(), date_starting: startDate.toISOString()};
    axiosWithAuth().post('/api/auctions', postData)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  return (
    <div>
      <form onChange={handleChange}>
        <Grid container justify="center" direction="column" spacing={3}>
          <Grid item> 
            <TextField required variant="outlined" label="Title"placeholder="iPhone SE" name="name"/>
          </Grid>
          <Grid item>
            <TextField required type="number" variant="outlined" label="Price" placeholder={"150"}  name="starting_price"/>
          </Grid>
          <Grid item>
            <TextField multiline={true} variant="outlined" label="Description" placeholder="A beautiful iPhone!"  name="description"/>
          </Grid>
          <Grid item>
            <TextField required variant="outlined" label="Image URL" placeholder="https://...."  name="image"/>
          </Grid>
        </Grid>
      </form>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={2}>
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
          <Grid item xs={2}>
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
          <Grid item xs={2}>
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
          <Grid item xs={2}>
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
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  )
}

export default AuctionForm;