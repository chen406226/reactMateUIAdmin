import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request
  // baseURL: "/api", // url = base url + request
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
console.log('process.env.VUE_APP_BASE_API', process.env.VUE_APP_BASE_API)

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    if (store.getters.isCheck) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['isCheck'] = store.getters.isCheck
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
const c_mock = false
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    let m_code = c_mock?20000:200 
    // if the custom code is not 20000, it is judged as an error.
    if (res.code != m_code) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code == 9999 || res.code == 50012 || res.code == 50014) {
        // to re-login
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
        console.log(res,'ressssssssssss')
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        // })
      }
      return Promise.reject(new Error(res.message || '未知错误'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
