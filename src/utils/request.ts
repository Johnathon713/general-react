import axios from 'axios'
// @ts-ignore
import qs from 'qs'

const service = axios.create({
    baseURL: 'api/',
    headers: {'Accept': 'application/xml'},
    timeout: 1000,
    onUploadProgress: function (progressEvent) {
        console.log(progressEvent)
    },
    onDownloadProgress: function (progressEvent) {
        console.log(progressEvent)
    },
    paramsSerializer: params => {
        return qs.stringify(params, {arrayFormat: 'repeat'})
    }
})

export default service