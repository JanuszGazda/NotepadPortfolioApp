import axios from 'axios'

const USER = 'admin'
const NOTEPAD_API_URL = 'http://localhost:8080'
const USER_API_URL = `${NOTEPAD_API_URL}/${USER}`

class NotepadDataService {

  retrieveAllNotes(name) {
    return axios.get(`${USER_API_URL}/notes`);
  }

  deleteNote(id) {
    return axios.delete(`${NOTEPAD_API_URL}/${USER}/note/${id}`);
  }
}

export default new NotepadDataService()
