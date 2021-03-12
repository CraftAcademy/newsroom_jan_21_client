import Auth from "j-tockauth";
import store from '../state/store/configureStore'
import axios from 'axios'

const auth = new Auth({
  host: "http://localhost:3000",
  prefixUrl: "/api",
})

const signInUser = async (event, setSecondOpen) => {
  const credentials = {
    email: event.target.email.value,
    password: event.target.password.value
  }
  auth.signIn(credentials.email, credentials.password)
    .then(() => {
      store.dispatch({ type: "AUTHENTICATE" })
      setSecondOpen(false)
    })
    .catch(error => {
      let errorMessage = error.response ? error.response.data.errors[0] : error.message
      store.dispatch({ type: "ERROR_HANDLER", payload: errorMessage })
    })
}

const registerUser = async (event, setOpen) => {
  const credentials = {
    email: event.target.email.value,
    password: event.target.password.value,
    password_confirmation: event.target.password_confirmation.value
  }
  auth.signUp(credentials)
    .then(() => {
      store.dispatch({ type: "AUTHENTICATE" })
      setOpen(false)
    })
    .catch(error => {
      let errorMessage = error.response ? error.response.data.errors[0] : error.message
      store.dispatch({ type: "ERROR_HANDLER", payload: errorMessage })
    })
}

const authValidation = async () => {
  let auth_headers = JSON.parse(localStorage.getItem('J-tockAuth-Storage'))
  axios.get('/auth/validate_token', { headers: auth_headers })
    .then(() => {
      store.dispatch({ type: "AUTHENTICATE" })
    })
    .catch(error => {

    })
}

const signOutUser = async () => {
  auth.signOut().then(response => {
    store.dispatch({ type: "LOG_OUT" })
  })
    .catch(error => {

    })
}

export { signInUser, registerUser, authValidation, signOutUser }