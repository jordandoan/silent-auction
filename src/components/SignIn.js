import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import UserContext from '../contexts/UserContext';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {

  const classes = useStyles();
  const username = (props.location.state && props.location.state.username) || "";
  const [fields, setFields] = useState({username: username, password: ""});
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({username: false, password: false});
  const [errMsg, setMsg] = useState("");
  const User = useContext(UserContext);

  const handleChange = e => {
    setFields({...fields, [e.target.name]: e.target.value})
  }

  const validateErrors = () => {
    let validated = true;
    let obj = {};
    for (let key in fields) {
      if (fields[key].length === 0) {
        validated = false
        obj[key] = true;
      } else {
        obj[key] = false;
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
      axiosWithAuth().post('/api/auth/login', fields)
        .then(res => {
          setTimeout( () => {
            setLoading(false);
            setMsg("Success!");
            User.setToken(res.data.token);
            localStorage.setItem('token', res.data.token);
            props.history.push("/dashboard");
          }, 750)
        })
        .catch(err => {
          setTimeout( () => {
            setLoading(false);
            setMsg("Incorrect credentials");
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate onChange={handleChange} onSubmit={handleSubmit}>
          {errMsg && <p>{errMsg}</p>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="username"
            error={error.username}
            defaultValue={fields.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={error.password}
          />
          {loading && <LinearProgress color="secondary"/>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}