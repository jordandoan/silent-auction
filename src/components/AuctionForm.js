import 'date-fns';
import React from 'react';
import { Grid, FormControl, InputLabel, Input, TextField } from '@material-ui/core/';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const AuctionForm = () => {
  const [startDate, setStart] = React.useState(new Date());
  const [endDate, setEnd] = React.useState(new Date().setDate(new Date().getDay() + 8))
  const handleDateChange = date => {
    setStart(date);
  };

  return (
    <div>
      <Grid container justify="center" direction="column" spacing={3}>
        <Grid item> 
          <TextField variant="outlined" label="Title"placeholder="iPhone SE"/>

        </Grid>
        <Grid item>
          <TextField type="number" variant="outlined" label="Price" placeholder={150} />

        </Grid>
        <Grid item>
          <TextField multiline={true} variant="outlined" label="Description" placeholder="A beautiful iPhone!"/>

        </Grid>
        <Grid item>
          <TextField variant="outlined" label="Image URL" placeholder="https://...."/>

        </Grid>
      </Grid>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={2}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Start date"
              value={startDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
          <Grid item spacing={2} xs={2}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
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
              id="date-picker-inline"
              label="End date"
              value={endDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="End time"
              value={endDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  )
}

export default AuctionForm;