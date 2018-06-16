export default function reduce(state = {}, action) {
  switch (action.type) {
    case 'TOKEN_EXISTS':
      return {
        ...state,
        tokenExists: true
      }

    case 'TOKEN_DOES_NOT_EXIST':
      return {
        ...state,
        tokenExists: false
      }

    case 'MINT_TOKEN_STARTED':
      return {
        ...state,
        mintingToken: action.hash,
        mintTokenStatus: 'pending'
      }

    case 'MINT_TOKEN_SUCCESS':
      return {
        ...state,
        mintTokenStatus: 'success'
      }

    case 'MINT_TOKEN_FAILURE':
      return {
        ...state,
        mintTokenStatus: 'failure'
      }

    default:
      return state
  }
}
