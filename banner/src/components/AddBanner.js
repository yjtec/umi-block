import React,{Component,Fragment} from 'react';
import {Modal,Form,Row,Col,Button,Select,Input,InputNumber} from 'antd';
import {connect} from 'dva';
import styles from '../index.css';
import {Upload} from '@yjtec/upload';
const FormItem = Form.Item;
const {Option} = Select;
@connect(({ BLOCK_NAME_CAMEL_CASE,loading })=>({
	loading: loading.effects['BLOCK_NAME_CAMEL_CASE/fetchAdd'],
}))
class AddBanner extends Component{
	constructor(props) {
    super(props);
    this.state={
    	btnloading: false,
      visibleModal: false,
    }
  }
  componentDidMount(){

  }
  handleOk= e => {
  	e.preventDefault();
    const {form,dispatch} = this.props;
    form.validateFieldsAndScroll((err,values) => {
    	if(err) return;
    	const { pic } = values;
	    this.setState({
	      btnloading: true
	    },()=>{
	      dispatch({
	        type:'BLOCK_NAME_CAMEL_CASE/fetchAdd',
	        payload: {
	        	...values,
	        	pic: pic.path
	        }
	      }).then(re=>{
	      	if(re){
	      		this.setState({
	      			visibleModal: false
	      		})
	      	}
	      })
	    })
    });  
  }
  handleCancel=(e) => {
    this.setState({
      visibleModal: !this.state.visibleModal
    });
  }
  onBlurSms = (rule,value,callback) => {
    if(value){
      if (!/http[s]{0,1}:\/\/([\w.]+\/?)\S*/.test(value)) {
        callback("请输入正确的url链接");
      }
    }
    callback();
  }
  render(){
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { visibleModal, btnloading } = this.state;
    const { form:{getFieldDecorator}, platformData, typeData } = this.props;
    return(
    	<div className={styles.submitButtonsRight}>
        <Button type="primary" htmlType="submit" onClick={this.handleCancel}>
          新增
        </Button>
        <Modal
          title="新增轮播图"
          visible={visibleModal}
          onOk={this.handleOk}
          destroyOnClose={true}
          confirmLoading={btnloading}
          onCancel={this.handleCancel}
          >  
          <Form {...formItemLayout} onSubmit={this.handleOk}>
            <Form.Item label="平台">
              {getFieldDecorator('platform_id',{
              	rules:[{
	                required:true,
	                message:"选择平台"
	              }],
              })(
	              <Select style={{ width: 200 }} placeholder="请选择" mode="multiple">
	                {platformData.map(item => (
	                  <Option key={item.id} value={item.id}>{item.title}</Option>
	                ))}
	              </Select>
              )}
            </Form.Item>
            <Form.Item label="分类">
              {getFieldDecorator('type',{
              	rules:[{
	                required:true,
	                message:"选择分类"
	              }],
              })(
	              <Select style={{ width: 200 }} placeholder="请选择">
	                {typeData.map(item => (
	                  <Option key={item.id} value={item.id}>{item.title}</Option>
	                ))}
	              </Select>
              )}
            </Form.Item>
            <Form.Item label="标题">
	            {getFieldDecorator('title',{
	            	rules:[{
	                required:true,
	                message:"请输入标题"
	              }],
	            })(<Input minLength={1} maxLength={12} style={{width:320}} />)}
	          </Form.Item>
            <Form.Item label="图片">
	            {getFieldDecorator('pic',{
	              rules:[{
	                required:true,
	                message:"请上传图片"
	              }],
	            })(<Upload 
	                data={{
	                  type:'adv'
	                }}
	                action="/api/cmm/upload"
	                buttonText="LOGO"
	              />)}
	          </Form.Item>
	          <Form.Item label="排序">
	            {getFieldDecorator('weight',{
	            	initialValue: 0
	            })(<InputNumber min={0} step={1} max={255} />)}
	          </Form.Item>
	          <Form.Item label="跳转链接">
	            {getFieldDecorator('link',{
	            	rules: [{
                  validator: this.onBlurSms
                }]
	            })(<Input style={{width:320}} />)}
	          </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
const addForm = Form.create({name:'add_banner'})(AddBanner);
export default addForm;