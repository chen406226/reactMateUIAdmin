import {SET_ERROR_MSG} from './consts'

export function setMsg(msg){
    return {
        type: SET_ERROR_MSG,
        msg
    }
}

export function setUserInfo(userInfo){
    window.localStorage.setItem('userInfo',JSON.stringify(userInfo||{}))
    return {
        type:'SET_USER_INFO',
        userInfo
    }
}

export function setLoadingStatus(isLoading){//设置加载状态
	return {
		type:'SET_LOADING_STATUS',
		isLoading:!!isLoading
	}
}