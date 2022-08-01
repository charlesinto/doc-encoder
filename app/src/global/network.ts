import axios from 'axios'
import { apis } from './resources'


export const Axios = axios.create({baseURL: apis['BASE_URL']})
