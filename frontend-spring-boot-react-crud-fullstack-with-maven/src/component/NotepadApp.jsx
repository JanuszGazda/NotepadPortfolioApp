import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListNotesComponent from './ListNotesComponent.jsx'
import ListNotesAndUsersComponent from './ListNotesAndUsersComponent.jsx'
import LoginComponent from './login/LoginComponent.jsx'
import NoteComponent from './NoteComponent.jsx'
import LogoutComponent from './login/LogoutComponent.jsx'
import AuthenticatedRoute from './login/AuthenticatedRoute.jsx'
import NavBarComponent from './NavBarComponent.jsx'

class NotepadApp extends Component {
    render() {
        return (
          <Router>
            <>
              <NavBarComponent />
              <div style={{paddingTop: 50}}></div>
              <Switch>
                <Route path="/" exact component={LoginComponent} />
                <Route path="/login" exact component={LoginComponent} />
                <AuthenticatedRoute path="/logout" exact component={LogoutComponent} />
                <AuthenticatedRoute path="/notes" exact component={ListNotesComponent} />
                <AuthenticatedRoute path="/note/:id" exact component={NoteComponent} />
                <AuthenticatedRoute path="/notesAndUsers" exact component={ListNotesAndUsersComponent} />
              </Switch>
            </>
          </Router>
        )
    }
}

export default NotepadApp
