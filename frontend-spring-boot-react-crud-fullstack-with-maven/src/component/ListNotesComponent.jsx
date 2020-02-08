import React, { Component } from 'react';
import NotepadDataService from '../service/NotepadDataService.js';
import AuthenticationService from '../service/AuthenticationService'

class ListNotesComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      message: null
    }
    this.refreshNotes = this.refreshNotes.bind(this)
    this.deleteNoteClicked = this.deleteNoteClicked.bind(this)
    this.updateNoteClicked = this.updateNoteClicked.bind(this)
    this.addNoteClicked = this.addNoteClicked.bind(this)
  }

  componentDidMount() {
    this.refreshNotes();
  }

  refreshNotes() {
    NotepadDataService.retrieveAllNotes(AuthenticationService.getLoggedInUserName())
      .then(
        response => {
          console.log(response);
          this.setState({ notes: response.data})
        }
      )
  }

  deleteNoteClicked(id) {
    NotepadDataService.deleteNote(id)
      .then(
        response => {
          this.setState({ message: `Delete of note number ${id} succesful` })
          this.refreshNotes()
        }
      )
  }

  updateNoteClicked(id) {
    this.props.history.push(`/note/${id}`)
  }

  addNoteClicked() {
    this.props.history.push(`/note/-1`)
  }

    render() {
        return (
            <div className="container">
                <h3>All Notes</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                              this.state.notes.map(
                                note =>
                                  <tr key={note.id}>
                                    <td>{note.id}</td>
                                    <td>{note.note}</td>
                                    <td><button className="btn btn-success" onClick={() => this.updateNoteClicked(note.id)}>Update</button></td>
                                    <td><button className="btn btn-warning" onClick={() => this.deleteNoteClicked(note.id)}>Delete</button></td>
                                  </tr>
                              )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                  <button className="btn btn-success" onClick={this.addNoteClicked}>Add</button>
                </div>
            </div>
        )
    }
}

export default ListNotesComponent
