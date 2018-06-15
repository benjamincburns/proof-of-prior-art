import { takeEvery, call } from 'redux-saga/effects';
import { MINT_TOKEN_ACTION } from '../Actions/mint';
import { sha3 } from 'web3-utils';

export function* mintToken(drizzle, action) {
  let hash = yield call(sha3, action.priorArt)
  console.log('minting token for ', action.priorArt, hash);
  yield call(drizzle.contracts.PriorArtToken.methods.mint.cacheSend, hash);
}

export default function* mint(drizzle) {
  yield takeEvery(MINT_TOKEN_ACTION, mintToken, drizzle)
}
