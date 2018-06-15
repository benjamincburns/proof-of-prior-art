import { all, fork, call } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'
import mintSaga from './mint'

export default function* root(drizzle) {
  yield all(
    [...drizzleSagas.map(saga => fork(saga)),
      call(mintSaga, drizzle)
    ]
  )
}
