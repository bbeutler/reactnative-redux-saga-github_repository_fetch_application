import { takeEvery, call, put } from 'redux-saga/effects';
import * as types from '../actions/ActionTypes';
import { fetchRepo } from '../../api/fetchRepo';

function* takeFetchRepo() {
    yield takeEvery(types.FETCH_REPO, fetchRepoAsync);
}

function* fetchRepoAsync(action) {
    try {
        const repo_data = yield call(fetchRepo, {repo_name: action.payload.repo_name});
        let repoData = repo_data.items.map((data, index) => {
            data.checked = false;
            return data;
        });
        yield put({type: types.FETCH_SUCCESS, repo_data: repoData});
    } catch (e) {
        yield put({type: types.FETCH_FAILED});
    }
}

export default function* rootSaga() {
    yield [
        takeFetchRepo()
    ]
}