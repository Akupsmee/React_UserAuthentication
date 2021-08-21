
import React, { useState, useContext, useEffect } from 'react';
import { mainContext } from "../contexts/mainContext"
import { useHistory } from "react-router-dom"
import AuthService from "../services/Auth.Service"
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
import Tooltip from '@material-ui/core/Tooltip';
import { Alert, AlertTitle } from '@material-ui/lab';

function Copyright() {
  return (
    <Typography variant="body2" color="textInfo" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Blaise
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  
  root: {

    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#004d40"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ef6c00"
    },
    "& .MuiOutlinedInput-input": {
      color: "grey"
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "#004d40"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "grey"
    },
    "& .MuiInputLabel-outlined": {
      color: "grey"
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "#004d40"
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "grey"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
}));


const Login = () => {
  const [username, setUsername] = useState('BLA28@gmail.com')
  const [password, setPassword] = useState('Cmpose12')
  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState('')
  const { jwt, setJwt } = useContext(mainContext)
  const loading = (time) => new Promise((resolve) => setTimeout(resolve, time))
  const history = useHistory()

  const alertToggle = async (msg) => {
    setAlertText(msg)
    setShowAlert(true)
    await loading(3000)
    setShowAlert(false)
  }

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'username': setUsername(e.target.value)
        break;
      case 'password': setPassword(e.target.value)
        break;
      default:
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { username, password }
      const response = await AuthService.login(user)
      const { token } = response.data
      localStorage.setItem('token', token)
      setJwt(token)
      history.push('/')
    } catch (error) {
      alertToggle(error.response.data.error)
    }

  }

  useEffect(() => {
    if (jwt || jwt !== '') {
      return history.push('/dash')
    }
  }, [jwt, history])

  const classes = useStyles();


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
        <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
          <Tooltip title="Enter email as username">
            <TextField
              className={classes.root}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={(e) => handleChange(e)}

            />
          </Tooltip>

          <Tooltip title="Enter password">
            <TextField
              className={classes.root}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => handleChange(e)}
            />
          </Tooltip>

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {
            showAlert &&
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              {alertText}
            </Alert>
          }

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
            <Grid item xs>
              <Link style ={{color : 'grey'}} href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link style ={{color : 'grey'}} href="/signup" variant="body2">
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
  )
}

export default Login
