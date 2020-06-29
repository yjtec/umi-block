import React,{Component,Fragment} from 'react';
import {Modal,Form,Row,Col,Button,Select,Input,InputNumber} from 'antd';
import AgentTable from './AgentTable';
import {connect} from 'dva';
import styles from '../index.css';
const FormItem = Form.Item;
const { Search } = Input;
@connect(({ BLOCK_NAME_CAMEL_CASE,loading })=>({
	loading: loading.effects['BLOCK_NAME_CAMEL_CASE/fetchAdd'],
  listData: BLOCK_NAME_CAMEL_CASE.listData,
}))
class AddAgent extends Component{
	constructor(props) {
    super(props);
    this.state={
      datas:null,
    	btnloading: false,
      visibleModal: false,
    }
  }
  componentDidMount(){

  }
  searchAgentId=value=>{
    const {dispatch,listData} = this.props;
    console.log(value);
    if(value){
      this.setState({
        datas:listData
      })
    }
  }
  handleOk= e => {
  	
  }
  handleCancel=(e) => {
    this.setState({
      visibleModal: !this.state.visibleModal
    });
  }
  
  render(){
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { visibleModal, btnloading, datas } = this.state;
    const { form:{getFieldDecorator},listData} = this.props;
    return(
    	<div className={styles.submitButtonsRight}>
        <Button type="primary" htmlType="submit" onClick={this.handleCancel}>
          新增体验代理商
        </Button>
        <Modal
          title="新增体验代理商"
          visible={visibleModal}
          onOk={this.handleOk}
          destroyOnClose={true}
          footer={null}
          width={720}
          confirmLoading={btnloading}
          onCancel={this.handleCancel}
          >
          <Search
            placeholder="请输入代理商id"
            onSearch={this.searchAgentId}
          />
          {datas && <AgentTable datas={datas} />}
        </Modal>
      </div>
    )
  }
}
const addForm = Form.create({name:'add_agent'})(AddAgent);
export default addForm;