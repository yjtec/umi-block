import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.css';
import {Card,Tabs,Input,Row,Col,Button,Modal,Divider} from 'antd';
import List from './components/List';
import Form from './components/Form/';
import columns from './columns';
import fields from './fields';
@connect(({ loading, BLOCK_NAME_CAMEL_CASE }) => ({
  data: BLOCK_NAME_CAMEL_CASE.data,
  loading: loading.effects['BLOCK_NAME_CAMEL_CASE/fetch'],
}))
class PAGE_NAME_UPPER_CAMEL_CASE extends PureComponent{
  state ={
    visible:false,
    data:{}
  }
  componentDidMount(){
    this.props.dispatch({
      type:"BLOCK_NAME_CAMEL_CASE/fetch"
    })
  }
  handleShowModal = () => {
    this.setState({
      visible:true
    })
  }
  handleCancel = () => {
    this.form.resetFields();
    this.setState({
      visible:false
    })
  }
  handleSubmit = (values) => {
    this.form.resetFields();
    this.setState({
      visible:false,
      data:{}
    })    
    const {dispatch} = this.props;
    if(this.state.data.id){
      dispatch({
        type:"BLOCK_NAME_CAMEL_CASE/fetchPut",
        payload:{id:this.state.data.id,params:values}
      })
    }else{
      dispatch({
        type:"BLOCK_NAME_CAMEL_CASE/fetchSave",
        payload:values
      })
    }
    
    
  }
  handleDelete = (value) => {
    const {dispatch} = this.props;
    dispatch({
      type:"BLOCK_NAME_CAMEL_CASE/fetchDelete",
      payload:value
    })
  }
  handleEdit = (record) => {

    this.setState({
      visible:true,
      data:record
    });
    
    this.form.setFieldsValue({
      ...record
    })
  }
  handleAccess = (id) => {

  }
  render(){
    const {data} = this.props;
    columns.columns.handle = {
      label:'操作',
      render:(value,record) => (
        <span>
          <a href="javascript:;" onClick={()=>this.handleEdit(record)}>编辑</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={()=>this.handleDelete(record.id)}>删除</a>
          
        </span>
      )
    }
    return(
      <Card>
        <Button onClick={this.handleShowModal}>新增角色</Button>
        <List field={columns} data={data} />
        <Modal
          title="角色管理"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          footer={null}
          forceRender={true}
          mask={true}
        >
          <Form fields={fields}  ref={(form) =>this.form = form} showButton={false} onSubmit={this.handleSubmit} />
        </Modal>
      </Card>
    );
    
  }
}

export default PAGE_NAME_UPPER_CAMEL_CASE;