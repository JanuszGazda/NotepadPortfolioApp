import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListNotesComponent from './ListNotesComponent.jsx'
import NoteComponent from './NoteComponent.jsx'

class NotepadApp extends Component {
    render() {
        return (
          <Router>
            <>
              <h1>Notepad Application</h1>
              <Switch>
                <Route path="/" exact component={ListNotesComponent}/>
                <Route path="/notes" exact component={ListNotesComponent}/>
                <Route path="/note/:id" component={NoteComponent}/>
              </Switch>
            </>
          </Router>
        )
    }
}

export default NotepadApp
