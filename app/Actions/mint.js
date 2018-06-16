export const MINT_TOKEN_STARTED = 'MINT_TOKEN_STARTED';
export const MINT_TOKEN_SUCCESS = 'MINT_TOKEN_SUCCESS';
export const MINT_TOKEN_FAILURE = 'MINT_TOKEN_FAILURE';

export const BEGIN_TOKEN_EXISTENCE_CHECK = 'BEGIN_TOKEN_EXISTENCE_CHECK';
export const TOKEN_EXISTS = 'TOKEN_EXISTS';
export const TOKEN_DOES_NOT_EXIST = 'TOKEN_DOES_NOT_EXIST';

export function mintToken(priorArt) {
  return { 
    type: MINT_TOKEN_STARTED,
    priorArt
  }
}
