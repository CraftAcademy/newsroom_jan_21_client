import initialState from '../store/initialState'

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ARTICLE_TYPE":
      return {
        ...state,
        articleType: action.payload,
        errorMessage: undefined
      }
    case "SET_ARTICLES":
      return {
        ...state,
        articles: action.payload.articles,
        message: action.payload.message,
        errorMessage: undefined
      }
    case "SET_SINGLE_CONTENT":
      return {
        ...state,
        content: action.payload,
        errorMessage: undefined
      }
    case "ERROR_HANDLER":
      return {
        ...state,
        errorMessage: action.payload
      }
    case "AUTHENTICATE":
      return {
        ...state,
        authenticated: true
      }
    default:
      return state
  }
}

export default rootReducer;
