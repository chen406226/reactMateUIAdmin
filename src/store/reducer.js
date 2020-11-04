
export let msg = function (state = "", action) {
    switch (action.type) {
        case 'SET_ERROR_MSG':
            return action.msg
        default:
            return state
    }
}

let initUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
export let userInfo = function (state = initUserInfo, action) {
    switch (action.type) {
        case 'SET_USER_INFO':
            return Object.assign({}, action.userInfo);
        default:
            return state
    }
}

export let isLoading = function isLoading(state = true, action) {
    switch (action.type) {
        case "SET_LOADING_STATUS":
            return action.isLoading;
        default:
            return state;
    }
}
export let redirect = function isLoading(state = '/', action) {
    switch (action.type) {
        case "SET_REDIRECT":
            return action.redirect;
        default:
            return state;
    }
}