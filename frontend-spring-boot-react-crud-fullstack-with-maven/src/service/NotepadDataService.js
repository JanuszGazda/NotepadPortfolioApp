import axios from 'axios'
import AuthenticationService from './AuthenticationService'

const API_URL = 'http://localhost:8080'

class NotepadDataService {

  retrieveAllNotes() {
    return axios.get(`${API_URL}/${AuthenticationService.getLoggedInUserName()}/notes`);
  }

  retrieveAllNotesfromAllUsers() {
    return axios.get(`${API_URL}/${AuthenticationService.getLoggedInUserName()}/allNotes`);
  }

  retrieveNote(id) {
    return axios.get(`${API_URL}/${AuthenticationService.getLoggedInUserName()}/note/${id}`);
  }

  deleteNote(id) {
    return axios.delete(`${API_URL}/${AuthenticationService.getLoggedInUserName()}/note/${id}`);
  }

  updateNote(id, note) {
    return axios.put(`${API_URL}/${AuthenticationService.getLoggedInUserName()}/note/${id}`, note);
  }

  createNote(note, id) {
    return axios.post(`${API_URL}/${AuthenticationService.getLoggedInUserName()}/note/`, note);
  }
}

export default new NotepadDataService()
