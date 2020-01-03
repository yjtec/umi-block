import React,{Component,Fragment,PureComponent} from 'react';
import {connect} from 'dva';
import styles from './index.css';
import {Button,Card,Table,Tag,Modal} from 'antd';
import EditSort from './components/EditSort';
import BannerOperator from './components/operator';
const { confirm } = Modal;
@connect(({ BLOCK_NAME_CAMEL_CASE,loading })=>({
	listData: BLOCK_NAME_CAMEL_CASE.listData,
	loading: loading.effects['BLOCK_NAME_CAMEL_CASE/fetch','BLOCK_NAME_CAMEL_CASE/fetchPlatform'],
  status:BLOCK_NAME_CAMEL_CASE.statusData,
  type:BLOCK_NAME_CAMEL_CASE.typeData,
  pagination:BLOCK_NAME_CAMEL_CASE.pagination,
}))
class PAGE_NAME_UPPER_CAMEL_CASE extends PureComponent{
	state={
		search:{},
    sortModal: false
	}
	componentDidMount(){
    const {dispatch} = this.props;
    dispatch({
      type:'BLOCK_NAME_CAMEL_CASE/fetchPlatform'
    });
    dispatch({
      type:'BLOCK_NAME_CAMEL_CASE/fetch'
    })
  }
	handlePageChange = (page,pageSize) => {
    const {dispatch} = this.props;
    const {search} = this.state;
    dispatch({
      type:'BLOCK_NAME_CAMEL_CASE/fetch',
      payload:{...search,page,pageSize}
    })
  }
	handleSearch = values => {
    const {dispatch} = this.props;
    this.setState({
      search:values
    },()=>{
      const {search} = this.state;
      dispatch({
        type:'BLOCK_NAME_CAMEL_CASE/fetch',
        payload:{page:1,...search}
      })
    })
  }
  renderHandle=(v,r)=>{
    if(r.status === 1){
      return (
        <Button type="primary" size="small" onClick={()=>this.handleOperator(r.id,'close')}>关闭</Button>
      )
    }else{
      return (
        <Button type="primary" size="small" onClick={()=>this.handleOperator(r.id,'open')}>开启</Button>
      )
    }
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
    const {type} = this.props;
    let tit="";
    if(type && type.length > 0){
      type.map(item=>{
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
	render(){
		const {
			pagination,
			loading,
      status,
      type,
      listData
    } = this.props;
    const columns =[{
      title: 'ID',
      dataIndex:'id',
      key:'id'
    },{
      title: '标题',
      dataIndex:'title',
      key:'title',
    },{
      title: '缩略图',
      dataIndex:'pic_url',
      key:'pic_url',
      render:(v,r) => (<span className={styles.logo}><img src={r} /></span>)
    },{
      width: 60,
      align: 'center',
      title: '排序',
      dataIndex:'weight',
      key:'weight',
      render:(v,r)=>(<EditSort {...r} />)
    },{
      title: '平台',
      dataIndex:'platform_id',
      key:'platform_id',
      render: this.renderPlatForm
    },{
      title: '时间',
      dataIndex:'created_at',
      key:'created_at'
    },{
      title: '状态',
      dataIndex:'status',
      key:'status',
      render:this.renderStatus
    },{
      title: '操作',
      dataIndex:'handle',
      key:'handle',
      render:this.renderHandle
    }];
		return (
	    <div className={styles.normal}>
	      <Fragment>
	        <BannerOperator {...this.props} statusData={status} typeData={type} onSubmit={this.handleSearch} />
	        <Card className={styles.searchCard}>
	        	<Table 
	            dataSource={listData} 
	            rowKey="id"
	            columns={columns}
	            loading={loading}
	            pagination={{
	              ...pagination,
	              onChange:this.handlePageChange
	            }} 
	          />
	        </Card>
	      </Fragment>
	    </div>
	  )
	}
}
export default PAGE_NAME_UPPER_CAMEL_CASE;