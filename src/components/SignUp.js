import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import { axiosWithAuth } from '../utils/axiosWithAuth';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Silent Auction
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [fields, setFields] = useState({first_name: "", last_name: "", username: "", password: "", is_seller: false})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({username: false, password: false, first_name: false, last_name: false});
  const [errMsg, setMsg] = useState("");

  const handleChange = e => {
    if (e.target.name === "is_seller") {
      setFields({...fields, is_seller: !fields.is_seller})
    } else {
      setFields({...fields, [e.target.name]: e.target.value})
    }
  }

  const validateErrors = () => {
    let validated = true;
    let obj = {};
    for (let key in fields) {
      if (key !== "is_seller") {
        if (fields[key].length === 0) {
          validated = false
          obj[key] = true;
        } else {
          obj[key] = false;
        }
      }
    }
    setError(obj);
    return validated
  }

  const handleSubmit = e => {
    e.preventDefault();
    let validated = validateErrors();
    if (validated) { 
      setLoading(true);
      axiosWithAuth().post('/api/auth/register', fields)
        .then(res => {
          setTimeout( () => {
            setLoading(false);
            setMsg("Success!");
            props.history.push("/signin", {username: fields.username});
          }, 750)
        })
        .catch(err => {
          setTimeout( () => {
            setLoading(false);
            setMsg("Error signing up. Have you tried a different username?");
          }, 750)
        })
    } else {
      setMsg("Please fill out all fields.");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onChange={handleChange} onSubmit={handleSubmit}>
          {errMsg && <p>{errMsg}</p>}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                error={error.first_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                autoComplete="lname"
                error={error.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                error={error.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={error.password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="primary" name="is_seller" checked={fields.is_seller}/>}
                label="Do you want to be a seller?"
              />
            </Grid>
          </Grid>
          {loading && <LinearProgress color="secondary"/>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}