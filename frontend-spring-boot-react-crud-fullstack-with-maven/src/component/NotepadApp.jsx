import React, { Component } from 'react';
import ListNotesComponent from './ListNotesComponent.jsx'

class NotepadApp extends Component {
    render() {
        return (<>
              <h1>Notepad Application</h1>
              <ListNotesComponent/>
              </>
        )
    }
}

export default NotepadApp
