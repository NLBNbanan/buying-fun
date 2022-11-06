import {post} from '../util/request'

export const editPassAPI=(data)=>post('/api/v1/users/change_pwd',data)