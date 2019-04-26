import { query,fetchSave,fetchDelete,fetchPut} from './service';
import {message} from 'antd';

export default { 
  namespace:'BLOCK_NAME_CAMEL_CASE',
  state:{
    data:[]
  },
  effects: {
    *fetch({payload}, { call, put }) {
      const response = yield call(query);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchDelete({payload},{call,put}){
      const response = yield call(fetchDelete,payload);
      if(response.errcode != 0){
        message.error(response.errmsg);
        return false;
      }
      message.success(response.errmsg);
      yield put({
        type:'fetch',
      })      

    },
    *fetchPut({payload},{call,put}){
      const response = yield call(fetchPut,payload.id,payload.params);
      if(response.errcode != 0){
        message.error(response.errmsg);
        return false;
      }
      message.success(response.errmsg);
      yield put({
        type:'fetch',
      })
    },
    *fetchSave({payload},{call,put}){
      const response = yield call(fetchSave,payload);
      if(response.errcode != 0){
        message.error(response.errmsg);
        return false;
      }
      message.success(response.errmsg);
      yield put({
        type:'fetch',
      })
    }
  },

  reducers: {
    save(state, action) {
      return {
        data: action.payload,
      };
    },
  }
}