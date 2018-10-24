import * as types from '../actions/ActionTypes';

const initialState = {
    finding: false,
    repoName: '',
    repoNameInvalid: false,
    repoData: null,
    fetchTimer: null,
    cntChecked: 0,
    cntCheckedStars: 0,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_REPO_NAME:
            return {...state, repoName: action.repo_name};
        case types.SET_NAME_INVALID:
            return {...state, repoNameInvalid: action.repo_name_invalid};
        case types.SET_REPO_DATA:
            return {...state, repoData: action.repo_data};
        case types.SET_CNT_CHECKED:
            return {...state, cntChecked: action.cnt_checked};
        case types.SET_CNT_CHECKED_STARS:
            return {...state, cntCheckedStars: action.cnt_checked_stars};
        case types.SET_FINDING:
            return {...state, finding: action.finding};
        case types.SET_FETCH_TIMER:
            return {...state, fetchTimer: action.fetch_timer};
        case types.INCREMENT_CNT_CHECKED:
            return {...state, cntChecked: state.cntChecked + 1};
        case types.DECREASE_CNT_CHECKED:
            return {...state, cntChecked: state.cntChecked - 1};
        case types.INCREMENT_CNT_CHECKED_STARS:
            return {...state, cntCheckedStars: state.cntCheckedStars + action.stars};
        case types.DECREASE_CNT_CHECKED_STARS:
            return {...state, cntCheckedStars: state.cntCheckedStars - action.stars};
        case types.UPDATE_REPO:
            let _repoData = state.repoData;
            _repoData[action.index] = action.repo;
            return {...state, repoData: _repoData};
            
        case types.FETCH_REPO:
            return {...state, finding: true, repoName: action.payload.repo_name, repoData: null};
        case types.FETCH_SUCCESS:
            return {...state, repoData:action.repo_data, finding: false};
        case types.FETCH_FAILED:
            return {...state, repoData: null, finding: false};
        default:
            return state;
    }
};