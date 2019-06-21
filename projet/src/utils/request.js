/**
 * axios封装，方便以后使用
 */

import axios from 'axios';
import qs from 'qs';
// 设置请求默认服务器地址
axios.defaults.baseURL = 'http://172.16.12.159:666'
export default{
  get(url,params={}){
      return new Promise((resolve,reject)=>{
        axios.get(url,{params})
        .then(response=>{
            resolve(response.data)
        })
        .catch(err=>{
            reject(err)
        })
      })
  },
  post(url,params={}){
      return new Promise((resolve,reject)=>{
          axios.post(url,qs.stringify(params))
          .then(response=>{
              resolve(response.data)
          })
          .catch(err=>{
              reject(err)
          })
      })
  }
}
// // 设置默认响应地址
// axios.defaults.baseURL='http://127.0.0.1:666';

// // 请求拦截器
// axios.interceptors.request.use(config => {
//     // 获取token
//     let token = window.localStorage.getItem('atom')
//     // 给头部携带token
//     config.headers.authorization = `Bearer ${token}` 
//     return config
// })

