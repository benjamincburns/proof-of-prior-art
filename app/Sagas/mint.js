import { take, takeEvery, put, call, all, race } from 'redux-saga/effects';
import { sha3 } from 'web3-utils';

const hashedActionSelector = (type, hash) => (action) =>
  action.type === type && action.hash === hash;

export function* checkIfTokenExists(drizzle, action) {
  let argsHash = yield call(drizzle.contracts.PriorArtToken.methods.getTokenIdForHash.cacheCall, action.hash)
  let state = yield call(drizzle.store.getState)

  if (!state.contracts.PriorArtToken.getTokenIdForHash[argsHash]) {
    yield take(action => {
      return action.type === 'GOT_CONTRACT_VAR' && action.argsHash === argsHash
    })

    state = yield call(drizzle.store.getState)
  }

  let tokenId = parseInt(state.contracts.PriorArtToken.getTokenIdForHash[argsHash].value);

  if (tokenId != 0) {
    yield put({
      type: 'TOKEN_EXISTS',
      hash: action.hash
    })
  } else {
    yield put({
      type: 'TOKEN_DOES_NOT_EXIST',
      hash: action.hash
    })
  }
}

function* mintTokenUnchecked(drizzle, hash) {
    let txId = yield call(drizzle.contracts.PriorArtToken.methods.mint.cacheSend, hash);

    let broadcastAction = yield take(
      action => action.type === 'TX_BROADCASTED' && action.stackId === txId
    )

    let txHash = broadcastAction.txHash;

    const { txSuccess } = yield race ({
      txSuccess: take(
        action => action.type === 'TX_SUCCESSFUL' && action.txHash === txHash,
        call(() => true)
      ),
      txError: take(
        action => action.type === 'TX_ERROR' && action.txHash === txHash,
        call(() => true)
      )
    })
    if (txSuccess) {
      yield put({
        type: 'MINT_TOKEN_SUCCESS',
        hash: hash
      })
    } else {
      yield put({
        type: 'MINT_TOKEN_FAILURE',
        hash
      })
    }
}
export function* mintTokenChecked(drizzle, action) {
  let hash = yield call(sha3, action.priorArt);

  yield put({
    type: 'BEGIN_TOKEN_EXISTENCE_CHECK',
    hash
  })

  const { tokenAvailable, doesNotExist } = yield race ({
    tokenAvailable: take(hashedActionSelector('TOKEN_DOES_NOT_EXIST', hash), call(()=>true)),
    doesNotExist: take(hashedActionSelector('TOKEN_EXISTS', hash), call(()=>true))
  })

  console.log(!!tokenAvailable, !!doesNotExist)

  if (tokenAvailable) {
    yield call(mintTokenUnchecked, drizzle, hash);
  } else {
    yield put({
      type: 'MINT_TOKEN_FAILURE',
      hash
    })
  }
}

export default function* mint(drizzle) {
  yield all([
    takeEvery('MINT_TOKEN_STARTED', mintTokenChecked, drizzle),
    takeEvery('BEGIN_TOKEN_EXISTENCE_CHECK', checkIfTokenExists, drizzle)
  ]);
}
