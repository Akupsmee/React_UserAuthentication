import React, { useContext, useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { mainContext } from '../contexts/mainContext';
import AuthService from '../services/Auth.Service';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';




const Dash = () => {

  const useStyles = makeStyles((theme) => ({
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
    submit: {
      margin: theme.spacing(3, 0, 2),
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
  }))



  const classes = useStyles();
  const { jwt, setJwt } = useContext(mainContext)
  const [parsedData, setParsedData] = useState('')
  const history = useHistory()

  const logout = () => {
    AuthService.logout()
    setJwt('')
    return history.push('/')
  }

  useEffect(() => {
    try {
      return setParsedData(JSON.parse(atob(jwt.split('.')[1])))
    } catch (error) {
      AuthService.logout()
      setJwt('')
      return history.push('/')
    }   
  }, [jwt, history])


  return (

    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <div className={classes.paper}>
        <h1>Login Info Page</h1>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <pre>{JSON.stringify(parsedData, null, 2)}</pre>
        </div>

        <Button
          onClick={() => logout()}
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Logout
        </Button>
      </Container>
    </div>



  )
}

export default Dash
