import * as types from './ActionTypes';

export function setRepoName(repo_name) {
    return {
        type: types.SET_REPO_NAME,
        repo_name
    }
}
export function setRepoData(repo_data) {
    return {
        type: types.SET_REPO_DATA,
        repo_data
    }
}
export function setRepoNameInvalid(repo_name_invalid) {
    return {
        type: types.SET_NAME_INVALID,
        repo_name_invalid
    }
}
export function setCntChecked(cnt_checked) {
    return {
        type: types.SET_CNT_CHECKED,
        cnt_checked
    }
}
export function setCntCheckedStars(cnt_checked_stars) {
    return {
        type: types.SET_CNT_CHECKED_STARS,
        cnt_checked_stars
    }
}
export function setFinding(finding) {
    return {
        type: types.SET_FINDING,
        finding
    }
}
export function setFetchTimer(fetch_timer) {
    return {
        type: types.SET_FETCH_TIMER,
        fetch_timer
    }
}
export function incrementCntChecked() {
    return {
        type: types.INCREMENT_CNT_CHECKED
    }
}
export function decreaseCntChecked() {
    return {
        type: types.DECREASE_CNT_CHECKED
    }
}
export function incrementCntCheckedStars(stars) {
    return {
        type: types.INCREMENT_CNT_CHECKED_STARS,
        stars
    }
}
export function decreaseCntCheckedStars(stars) {
    return {
        type: types.DECREASE_CNT_CHECKED_STARS,
        stars
    }
}
export function updateRepo(repo, index) {
    return {
        type: types.UPDATE_REPO,
        repo,
        index
    }
}
export function fetchRepo(repo_name) {
    return {
        type: types.FETCH_REPO,
        payload: {repo_name}
    }
}
export function fetchSuccess(repo_data) {
    return {
        type: types.FETCH_SUCCESS,
        repo_data
    }
}
export function fetchFailed() {
    return {
        type: types.FETCH_FAILED
    }
}