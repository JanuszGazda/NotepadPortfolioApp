import React, { Component } from 'react'
import AuthenticationService from '../../service/AuthenticationService';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://januszgazda.com/">
        Janusz Gazda
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked() {
        AuthenticationService.executeAuthService(this.state.username, this.state.password)
            .then(() => {
              AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
              this.props.history.push(`/notes`)
            }).catch(() => {
              this.setState({ showSuccessMessage: false })
              this.setState({ hasLoginFailed: true })
            })
    }



    render() {
      const classes = useStyles;
        return (

          <div className="container">
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" style={{paddingBottom: 10, paddingTop: 10}}>
                  Sign in
                </Typography>
                {this.state.hasLoginFailed && <div className="alert alert-warning">Nope, try again</div>}
                {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                {this.props.logout && <div className="alert alert-warning">See ya later</div>}
                <div className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    value={this.state.username}
                    onChange={this.handleChange}
                    required
                    fullWidth
                    label="username"
                    name="username"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                    fullWidth
                    name="password"
                    label="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    onClick={this.loginClicked}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                </div>
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
            </Container>
            </div>
        )
    }
}
export default LoginComponent
