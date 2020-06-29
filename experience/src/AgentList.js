import React,{Component,Fragment,PureComponent} from 'react';
import {connect} from 'dva';
import styles from './index.css';
import {Button,Card,Table,Tag,Modal,Tooltip} from 'antd';
import AddAgent from './components/AddAgent';
const { confirm } = Modal;
@connect(({ BLOCK_NAME_CAMEL_CASE,loading })=>({
	listData: BLOCK_NAME_CAMEL_CASE.listData,
	loading: loading.effects['BLOCK_NAME_CAMEL_CASE/fetch'],
  pagination:BLOCK_NAME_CAMEL_CASE.pagination,
}))
class PAGE_NAME_UPPER_CAMEL_CASE extends PureComponent{
	state={
    sortModal: false
	}
	componentDidMount(){
    const {dispatch} = this.props;
    // dispatch({
    //   type:'BLOCK_NAME_CAMEL_CASE/fetch'
    // })
  }
	handlePageChange = (page,pageSize) => {
    const {dispatch} = this.props;
    dispatch({
      type:'BLOCK_NAME_CAMEL_CASE/fetch',
      payload:{page,pageSize}
    })
  }
	handleSearch = values => {
    const {dispatch} = this.props;
    dispatch({
      type:'BLOCK_NAME_CAMEL_CASE/fetch',
      payload:{page:1}
    })
  }
  renderHandle=(v,r)=>{
    return (
      <Button type="danger" size="small" onClick={()=>this.handleOperator(r.id,'close')}>删除</Button>
    )
  }
  handleOperator=(id, status)=>{
    const that = this;
    let title= "开启";
    if(status == "close"){
      title= "关闭";
    }
    const {dispatch} = that.props;
    confirm({
      title: "提示",
      content: `您确定要${title}此轮播图?`,
      okText: '确认',
      cancelText: '取消',
      onOk(){
        dispatch({
          type:'BLOCK_NAME_CAMEL_CASE/fetchOperator',
          payload:{
            id: id,
            operator: status 
          }
        })
      },
      onCancel(){},
    });
  }
  renderPlatForm=(v,r)=>{
    const {platform} = this.props;
    let tit="";
    if(platform && platform.length > 0){
      platform.map(item=>{
        if(v === item.id){
          tit = item.title
        }
      });
      return <Tag color="green">{tit}</Tag>
    }
  }
  renderStatus=(v,r)=>{
    if(v === 1){
      return (
        <Tag color="green">开启中</Tag>
      )
    }else{
      return <Tag color="red">已关闭</Tag>
    }
  }
  renderType=(v,r)=>{
    const {typeData} = this.props;
    let tit="";
    if(typeData && typeData.length > 0){
      typeData.map(item=>{
        if(v === item.id){
          tit = item.title
        }
      });
      return <span>{tit}</span>
    }
  }
	render(){
		const {
			loading,
      listData
    } = this.props;
    const columns =[{
      title: 'ID',
      dataIndex:'id',
      key:'id'
    },{
      title: '名称',
      dataIndex:'name',
      key:'name',
    },{
      title: '手机号码',
      dataIndex:'phone',
      key:'phone',
    },{
      title: '操作',
      dataIndex:'handle',
      key:'handle',
      render:this.renderHandle
    }];
		return (
	    <div className={styles.normal}>
	      <Fragment>
	        <Card>
		        <AddAgent />
	        	<Table 
	            dataSource={listData} 
	            rowKey="id"
	            columns={columns}
	            loading={loading}
	            style={{marginTop: 20}}
	            pagination={false} 
	          />
	        </Card>
	      </Fragment>
	    </div>
	  )
	}
}
export default PAGE_NAME_UPPER_CAMEL_CASE;