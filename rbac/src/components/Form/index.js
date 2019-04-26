import React, {Component} from 'react';
import {Form,Button,Input,InputNumber,Select} from 'antd';
import style from './style.less';
import FI from './Item';
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};

@Form.create()
export default class Index extends Component{
  componentDidMount(){

  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {form:{validateFieldsAndScroll},onSubmit} = this.props;
    validateFieldsAndScroll((err,values)=>{
      if(!err){
        onSubmit(values);
      }
    })
  }
  render(){
    const {loading,fields:{fields},form:{getFieldDecorator}} = this.props;
    
    return (
      <div>
        <Form onSubmit={this.handleSubmit} >
          {Object.keys(fields).map(item =>( 
            <FormItem key={item} {...formItemLayout} label={fields[item].label} >
              {getFieldDecorator(item)(
                <FI {...fields[item]}/>
              )}
            </FormItem>
          ))}
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              提交
            </Button>
          </FormItem>
          
        </Form>
      </div>
    );
  }
}