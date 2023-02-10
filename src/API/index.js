import axios from 'axios'

//axios 인스턴스 생성
const BASE_URL = "http://10.125.121.177:8080/data/"

const axiosAPI = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options })
  return instance
}

export const defaultInstance = axiosAPI(BASE_URL)