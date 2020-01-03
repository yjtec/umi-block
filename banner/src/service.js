import request from 'umi-request';
import {stringify} from 'qs';
const baseUrl = '/api/cmm';
export async function query(params) {
  return request(`${baseUrl}/adv?${stringify(params)}`);
}
export async function querySave(params){
  return request(`${baseUrl}/adv`,{ 
    method:'post',
    data:params,
    requestType: 'form',
  })
}

export async function queryPlatform() {
  return request(`${baseUrl}/adv_platform`);
} 

//开启或关闭
export async function queryOperator(params){
  return request(`${baseUrl}/adv/${params.id}/${params.operator}`,{
    method:'put',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  })  
}

export async function querySort(params){
  return request(`${baseUrl}/adv/${params.id}`,{
    method:'put',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data:stringify(params)
  })  
}