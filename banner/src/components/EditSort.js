import React,{Component,Fragment} from 'react';
import {Modal,Form,Row,Col,Button,InputNumber} from 'antd';
import {connect} from 'dva';
import styles from '../index.css';
const FormItem = Form.Item;
@connect(({ BLOCK_NAME_CAMEL_CASE,loading })=>({
	loading: loading.effects['BLOCK_NAME_CAMEL_CASE/fetch']
}))
class EditSort extends Component{
	constructor(props) {
    super(props);
    this.state={
    	btnloading: false,
      visible: false,
    }
  }
  componentDidMount(){
  }
  handleOk= e => {
  	e.preventDefault();
    const {form,dispatch,id} = this.props;
    form.validateFieldsAndScroll((err,values) => {
    	if(err) return;
	    this.setState({
	      btnloading: true
	    },()=>{
	      dispatch({
	        type:'BLOCK_NAME_CAMEL_CASE/fetchEditSort',
	        payload: {
            ...values,
            id: id
          }
	      }).then(re=>{
          this.setState({
            btnloading: false
          });
	      	if(re){
	      		this.setState({
	      			visible: false
	      		})
	      	}
	      })
	    })
    });  
  }
  handleCancel=(e) => {
    this.setState({
      visible: !this.state.visible
    });
  }
  render(){
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { visible, btnloading } = this.state;
    const { form:{getFieldDecorator} } = this.props;
    return(
    	<Fragment>
        <span onClick={this.handleCancel} style={{width: 60, display: 'inline-block', textAlign: 'center', cursor:'pointer'}}>{this.props.weight}</span>
        <Modal
          title="修改排序"
          visible={visible}
          onOk={this.handleOk}
          destroyOnClose={true}
          confirmLoading={btnloading}
          onCancel={this.handleCancel}
          >  
          <Form {...formItemLayout} onSubmit={this.handleOk}>
            <Form.Item label="排序">
              {getFieldDecorator('weight',{
                initialValue: this.props.weight
              })(<InputNumber min={0} step={1} />)}
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    )
  }
}
const editForm = Form.create({name:'edit_sort'})(EditSort);
export default editForm;