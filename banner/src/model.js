import {
  query,querySave,querySort,queryPlatform,queryOperator,queryAdvType
} from './service';
import {message} from 'antd';
import {pageHandle} from './utils';
const statusData = {
  'open':{'label':'开启中','color':'green'},
  'close':{'label':'已关闭','color':'red'}
}
export default {
  namespace: 'BLOCK_NAME_CAMEL_CASE',
  state: {
    listData:[],
    PlatData:[],
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
    *fetchType({payload},{call,put,select}){
      const res = yield call(queryAdvType);
      yield put({
        type:'saveAdvType',
        payload:res
      });
    },
    *fetch({payload},{call,put,select}){
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
      if(res.errcode != 0){
        message.error(res.errmsg);
        return false;
      }else{
        let payloads = {...pagination, ...search};
        message.success(res.errmsg);
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
      if(res.errcode != 0){
        message.error(res.errmsg);
        return false;
      }else{
        let payloads = {...pagination, ...search};
        message.success(res.errmsg);
        yield put({
          type:'fetch',
          payload: payloads
        });
        return true;
      }
    },
    *fetchOperator({payload},{call,put,select}){
      const {search,pagination} = yield select(state => state.BLOCK_NAME_CAMEL_CASE);
      const res = yield call(queryOperator, payload);
      if(res.errcode != 0){
        message.error(res.errmsg);
        return false;
      }else{
        let payloads = {...pagination, ...search};
        message.success(res.errmsg);
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
    saveAdvType(state,{payload}){
      return {...state,typeData:payload.data}
    },
    savePlatform(state,{payload}){
      return {...state,PlatData:payload.data}
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