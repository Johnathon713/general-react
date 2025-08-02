import axios from 'axios'
// @ts-ignore
import qs from 'qs'

const service = axios.create({
  baseURL: '/api', headers: {'Accept': 'application/json'}, timeout: 1000, onUploadProgress: function (progressEvent) {
    console.log(progressEvent)
  }, onDownloadProgress: function (progressEvent) {
    console.log(progressEvent)
  }, paramsSerializer: params => {
    return qs.stringify(params, {arrayFormat: 'repeat'})
  }
})

service.interceptors.response.use(response => {
  if (response.status / 100 === 2 && response.data && response.data.status / 100 === 2) {
    return response
  } else {
    return Promise.reject(response)
  }
})
export default service
