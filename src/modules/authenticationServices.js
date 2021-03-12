import Auth from "j-tockauth";
import store from '../state/store/configureStore'

const auth = new Auth({
  host: "http://localhost:3000",
  prefixUrl: "/api",
})

const signInUser = async (event, setOpen)=> {

}

const registerUser = async (event, setOpen) => {
  const credentials = {
    email: event.target.email.value,
    password: event.target.password.value,
    password_confirmation: event.target.password_confirmation.value
  }
  auth.signUp(credentials.email, credentials.password, credentials.password_confirmation)
    .then(userData => {
      store.dispatch({ type: "AUTHENTICATE" })
      setOpen(false)
    })
    .catch(error => {
      debugger
      store.dispatch({type: "ERROR_HANDLER", payload: error})
    }) 
}

export { signInUser, registerUser }