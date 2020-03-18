import React, { Component } from 'react'
import AuthenticationService from '../../service/AuthenticationService';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


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
            showSuccessMessage: false,
            showSuccessRegistrationMessage: false,
            buttonsLabel: "Login",
            radioValue: "login"
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginFn = this.loginFn.bind(this)
        this.buttonClicked = this.buttonClicked.bind(this)
        this.registerFn = this.registerFn.bind(this)
        this.handleRadioChange = this.handleRadioChange.bind(this)
    }

    handleChange(event, value) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    handleRadioChange(event, value) {
        this.setState({ radioValue : event.target.value });
        this.setState({ buttonsLabel:  value });
    }

    buttonClicked() {
      if (this.state.radioValue === 'login') {
        this.loginFn()
      } else {
        this.registerFn()
      }
    }

    loginFn() {
        AuthenticationService.executeAuthService(this.state.username, this.state.password)
            .then((value) => {
              AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
              if (value.data == "user") {
                this.props.history.push(`/notes`)
              } else if (value.data == "admin") {
                this.props.history.push(`/notesAndUsers`)
              }
            }).catch(() => {
              this.setState({ showSuccessMessage: false })
              this.setState({ hasLoginFailed: true })
              this.setState({ showSuccessRegistrationMessage: false })
            })
    }

    registerFn() {
              AuthenticationService.registerSuccessfulRegistration(this.state.username, this.state.password)
            .then(() => {
              this.setState({ showSuccessRegistrationMessage: true })
              this.setState({ hasLoginFailed: false })
            }).catch(() => {
              this.setState({ showSuccessRegistrationMessage: false })
              this.setState({ showFailedRegistrationMessage: true })
              this.setState({ hasLoginFailed: false })
            })
    }



    render() {
      const classes = useStyles;
        return (

          <div className="container">
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>

                <RadioGroup row aria-label="gender" name="authRadio" value={this.state.radioValue} onChange={this.handleRadioChange}>
                    <FormControlLabel
                      value="login"
                      control={<Radio color="primary" />}
                      label="Login"
                      labelPlacement="start"
                      checked = {this.state.radioValue === 'login'}
                    />
                    <FormControlLabel
                      value="register"
                      control={<Radio color="primary" />}
                      label="Register"
                      labelPlacement="start"
                      checked = {this.state.radioValue === 'register'}
                    />
                </RadioGroup>
                {this.state.hasLoginFailed && <div className="alert alert-warning">Nope, try again</div>}
                {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                {this.state.showSuccessRegistrationMessage && <div className="alert alert-success">User {this.state.username} registered</div>}
                {this.state.showFailedRegistrationMessage && <div className="alert alert-warning">User {this.state.username} registration failed</div>}
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
                    onClick={this.buttonClicked}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    {this.state.buttonsLabel}
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
