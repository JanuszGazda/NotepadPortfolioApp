import axios from 'axios'
import AuthenticationService from './AuthenticationService'

const API_URL = 'http://localhost:8080'

class NotepadDataService {

  retrieveAllNotes(name) {
    return axios.get(`${API_URL}/${AuthenticationService.getLoggedInUserName()}/notes`);
  }

  retrieveNote(name, id) {
    return axios.get(`${API_URL}/${AuthenticationService.getLoggedInUserName()}/note/${id}`);
  }

  deleteNote(id) {
    return axios.delete(`${API_URL}/${AuthenticationService.getLoggedInUserName()}/note/${id}`);
  }

  updateNote(name, id, note) {
    return axios.put(`${API_URL}/${AuthenticationService.getLoggedInUserName()}/note/${id}`, note);
  }

  createNote(name, note) {
    return axios.post(`${API_URL}/${AuthenticationService.getLoggedInUserName()}/note/`, note);
  }
}

export default new NotepadDataService()
