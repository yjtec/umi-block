import React,{Component,Fragment,PureComponent} from 'react';
import {connect} from 'dva';
import {Button,Table} from 'antd';
class AgentTable extends Component{
	state={
    sortModal: false
	}
	componentDidMount(){
    
  }
  renderHandle=(v,r)=>{
    return (
      <Button type="primary" size="small" onClick={()=>this.handleOperator(r.id)}>添加</Button>
    )
  }
  handleOperator=id=>{
    const {dispatch} = this.props;
    dispatch({
      type:'',
      payload:{
        id: id
      }
    })
  }
	render(){
		const { datas } = this.props;
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
      title: '区域',
      dataIndex:'area',
      key:'area',
    },{
      title: '操作',
      dataIndex:'handle',
      key:'handle',
      render:this.renderHandle
    }];
		return (
    	<Table 
        dataSource={datas} 
        rowKey="id"
        style={{marginTop: 20}}
        columns={columns}
        pagination={false} 
      />
	  )
	}
}
export default AgentTable;