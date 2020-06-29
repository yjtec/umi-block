import React,{Component,Fragment,PureComponent} from 'react';
import {connect} from 'dva';
import styles from './index.css';
import {Button,Card,Table,Tag,Modal,Tooltip} from 'antd';
const { confirm } = Modal;
@connect(({ BLOCK_NAME_CAMEL_CASE,loading })=>({
	storeData: BLOCK_NAME_CAMEL_CASE.storeData,
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
      <Button type="danger" size="small" onClick={()=>this.handleOperator(r.id)}>回退</Button>
    )
  }
  handleOperator=(id, status)=>{
    const that = this;
    const {dispatch} = that.props;
    confirm({
      title: "提示",
      content: `回退后将丢失切换至新平台编辑的所有内容,确定回退?`,
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
	render(){
		const {
			pagination,
			loading,
      storeData
    } = this.props;
    const columns =[{
      title: 'ID',
      dataIndex:'id',
      key:'id'
    },{
      title: '店铺名称',
      dataIndex:'title',
      key:'title',
    },{
      title: '店铺封面',
      dataIndex:'avatar',
      key:'avatar',
      render:(v,r) => (<span className={styles.storelogo}><img src={v}  /></span>)
    },{
      title: '所属行业',
      dataIndex:'classify',
      key:'classify',
    },{
      title: '所属代理商',
      dataIndex:'agent',
      key:'agent',
    },{
      title: '详细地址',
      dataIndex:'area',
      key:'area',
    },{
      title: '联系方式',
      dataIndex:'phone',
      key:'phone',
    },{
      title: '操作',
      dataIndex:'handle',
      key:'handle',
      render:this.renderHandle
    }];
		return (
      <Card>
      	<Table 
          dataSource={storeData} 
          rowKey="id"
          columns={columns}
          loading={loading}
          style={{marginTop: 20}}
          pagination={{
            ...pagination,
            onChange:this.handlePageChange
          }} 
        />
      </Card>
	  )
	}
}
export default PAGE_NAME_UPPER_CAMEL_CASE;