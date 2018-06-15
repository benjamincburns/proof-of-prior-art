export const MINT_TOKEN_ACTION = 'mint/MINT_TOKEN_ACTION'

export function mintToken(priorArt) {
  return { 
    type: MINT_TOKEN_ACTION,
    priorArt
  }
}
