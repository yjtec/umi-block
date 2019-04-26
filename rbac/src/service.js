import request from 'umi-request';
import {stringify} from 'qs';
export async function query() {
  return request('/api/BLOCK_NAME/role');
}
export async function fetchSave(params){
  return request('/api/BLOCK_NAME/role',{ 
    method:'post',
    data:params,
    requestType: 'form',
  })
} 

export async function fetchDelete(id){
  return request(`/api/BLOCK_NAME/role/${id}`,{
    method:'delete'
  })
}

export async function fetchPut(id,params){
  return request(`/api/BLOCK_NAME/role/${id}`,{
    method:'put',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data:stringify(params)
  })  
}
