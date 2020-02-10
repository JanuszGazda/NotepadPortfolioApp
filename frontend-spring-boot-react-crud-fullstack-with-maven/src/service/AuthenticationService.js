import axios from 'axios'

const API_URL = "http://localhost:8080"

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

  executeAuthService(username, password) {
    return axios.get(`${API_URL}/login`,
        { headers: { authorization: this.createAuthToken(username, password)}})
  }

  createAuthToken(username, password) {
    return 'Basic ' + btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    this.setupAxiosInterceptors(this.createAuthToken(username, password))
  }

  registerSuccessfulRegistration(username, password) {
    return axios.post(`${API_URL}/register`, username, password );
  }

  isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

  setupAxiosInterceptors(token) {
    axios.interceptors.request.use(
      (config) => {
        if (this.isUserLoggedIn()) {
          config.headers.authorization = token
        }
        return config
      }
    )
  }

}

export default new AuthenticationService()
