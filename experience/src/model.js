import {
  query,querySave,querySort,queryPlatform,queryOperator,queryAdvType
} from './service';
import {message} from 'antd';
import {pageHandle} from './utils';
export default {
  namespace: 'BLOCK_NAME_CAMEL_CASE',
  state: {
    listData:[{
      id:1,
      name:'代理商名称',
      phone:'15237143629',
      area:['中原区','管城区','长垣市']
    },{
      id:2,
      name:'代理商名称',
      phone:'15237143627',
      area:['潍坊市']
    }],
    storeData:[{
      id:14097,
      title:'郑州方特欢乐园',
      avatar:'http://360vrsh.oss-cn-qingdao.aliyuncs.com/store_avatar/2020-06-04/5kdAW3aduQ5NmjspL5J21n0pfOon7CQRnLmmY6L2.png',
      classify:'旅游',
      agent:'平台代理商',
      address:'河南省郑州市中牟县',
      phone:'15890115804'
    }],
    pagination:{
      total:0,
      pageSize:10,
      current:1
    }
  },
  effects: {
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
      const {pagination} = yield select(state => state.BLOCK_NAME_CAMEL_CASE);
      const res = yield call(querySave, payload);
      if(res.errcode != 0){
        message.error(res.errmsg);
        return false;
      }else{
        let payloads = {...pagination};
        message.success(res.errmsg);
        yield put({
          type:'fetch',
          payload: payloads
        });
        return true;
      }
    },
    *fetchEditSort({payload},{call,put,select}){
      const {pagination} = yield select(state => state.BLOCK_NAME_CAMEL_CASE);
      const res = yield call(querySort, payload);
      if(res.errcode != 0){
        message.error(res.errmsg);
        return false;
      }else{
        let payloads = {...pagination};
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