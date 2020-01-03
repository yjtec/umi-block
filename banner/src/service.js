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

// export async function queryType() {
//   return request(`${baseUrl}/adv_type`);
// }

// export async function fetchDelete(id){
//   return request(`/api/BLOCK_NAME/role/${id}`,{
//     method:'delete'
//   })
// }
//开启或关闭
export async function queryOperator(id,params){
  return request(`${baseUrl}/adv/${id}/${params}`,{
    method:'put',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data:stringify(params)
  })  
}

export async function querySort(id,params){
  return request(`/api/BLOCK_NAME/role/${id}`,{
    method:'put',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data:stringify(params)
  })  
}