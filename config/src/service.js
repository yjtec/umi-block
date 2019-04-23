
import request from 'umi-request';

export async function query() {
  return request('/api/BLOCK_NAME/');
}

export async function fetchSave(params){
  return request('/api/BLOCK_NAME/',{ 
    method:'post',
    data:params,
    requestType: 'form',
  })
} 