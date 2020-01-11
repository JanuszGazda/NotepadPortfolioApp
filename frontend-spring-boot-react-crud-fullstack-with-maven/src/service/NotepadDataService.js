import axios from 'axios'

const USER = 'admin'
const NOTEPAD_API_URL = 'http://localhost:8080'
const USER_API_URL = `${NOTEPAD_API_URL}/${USER}`

class NotepadDataService {

  retrieveAllNotes(name) {
    return axios.get(`${USER_API_URL}/notes`);
  }

  retrieveNote(name, id) {
    return axios.get(`${USER_API_URL}/note/${id}`);
  }

  deleteNote(id) {
    return axios.delete(`${NOTEPAD_API_URL}/${USER}/note/${id}`);
  }

  updateNote(name, id, note) {
    return axios.put(`${USER_API_URL}/note/${id}`, note);
  }

  createNote(name, note) {
    return axios.post(`${USER_API_URL}/note/`, note);
  }
}

export default new NotepadDataService()
