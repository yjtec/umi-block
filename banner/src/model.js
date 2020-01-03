import {
  query,querySave,querySort,queryPlatform
} from './service';
import {message} from 'antd';
import {pageHandle} from './utils';
const statusData = {
  '1':{'label':'开启中','color':'green'},
  '-1':{'label':'已关闭','color':'red'}
}
export default {
  namespace: 'BLOCK_NAME_CAMEL_CASE',
  state: {
    listData:[],
    statusData:statusData,
    typeData:[],
    pagination:{
      total:0,
      pageSize:10,
      current:1
    },
    search:{}
  },
  effects: {
    *fetchPlatform({payload},{call,put,select}){
      const res = yield call(queryPlatform);
      yield put({
        type:'savePlatform',
        payload:res
      });
    },
    *fetch({payload},{call,put,select}){
      console.log(payload);
      const res = yield call(query, payload);
      yield put({
        type:'saveFetch',
        payload:res
      });
      yield put({
        type:'saveQuery',
        payload: payload
      })
    },
    *fetchAdd({payload},{call,put,select}){
      const {search,pagination} = yield select(state => state.BLOCK_NAME_CAMEL_CASE);
      const res = yield call(querySave, payload);
      if(res.errCode != 0){
        message.error(response.errmsg);
        return false;
      }else{
        let payloads = {...pagination, ...search};
        message.success(response.errmsg);
        yield put({
          type:'fetch',
          payload: payloads
        });
        return true;
      }
    },
    *fetchEditSort({payload},{call,put,select}){
      const {search,pagination} = yield select(state => state.BLOCK_NAME_CAMEL_CASE);
      const res = yield call(querySort, payload);
      if(res.errCode != 0){
        message.error(response.errmsg);
        return false;
      }else{
        let payloads = {...pagination, ...search};
        message.success(response.errmsg);
        yield put({
          type:'fetch',
          payload: payloads
        });
        return true;
      }
    },
  },
  reducers: {
    saveFetch(state,{payload}){
      const {data, meta} = payload;
      return {...state,listData:data,pagination:pageHandle(meta)}
    },
    savePlatform(state,{payload}){
      return {...state,typeData:payload.data}
    },
    saveQuery(state,{payload}){
      return {...state,search:payload};
    } 
  },
  subscriptions:{
    setup({dispatch,history}){
      // history.listen(({pathname,query}) => {
      //   if(pathname === '/store/view'){
      //     dispatch({
      //       type:"fetch",
      //       payload:query.id
      //     })
      //   }
      // })
    }
  }  
};