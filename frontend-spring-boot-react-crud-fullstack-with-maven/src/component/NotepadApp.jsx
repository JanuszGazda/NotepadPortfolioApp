import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListNotesComponent from './ListNotesComponent.jsx'
import NoteComponent from './NoteComponent.jsx'
import LoginComponent from './login/LoginComponent.jsx'
import AuthenticatedRoute from './login/AuthenticatedRoute.jsx'

class NotepadApp extends Component {
    render() {
        return (
          <Router>
            <>
              <h1 style={{textAlign:'center'}}>Notepad Application</h1>
              <Switch>
                <Route path="/" exact component={LoginComponent} />
                <Route path="/login" exact component={LoginComponent} />
                <AuthenticatedRoute path="/notes" exact component={ListNotesComponent} />
              </Switch>
            </>
          </Router>
        )
    }
}

export default NotepadApp
