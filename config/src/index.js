import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.css';
import {Card,Tabs,Form,Input,Row,Col,Button} from 'antd';
import Fields from './fields.js';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 3,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
    md: {
      span: 16,
    },
  },
};
@connect(({ loading, BLOCK_NAME_CAMEL_CASE }) => ({
  data: BLOCK_NAME_CAMEL_CASE.data,
  loading: loading.effects['BLOCK_NAME_CAMEL_CASE/fetch'],
}))
@Form.create()
class PAGE_NAME_UPPER_CAMEL_CASE extends PureComponent{
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({
      type:"BLOCK_NAME_CAMEL_CASE/fetch"
    })
  }
  componentDidUpdate(nextProps){
    const {data} = nextProps;
    if(JSON.stringify(data) !== JSON.stringify(this.props.data)){
      this.props.form.setFieldsValue({
        ...this.props.data,
      })
    }
  }  
  handleSubmit = e =>{ 
    e.preventDefault();
    const {form,dispatch} = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type:"BLOCK_NAME_CAMEL_CASE/post",
          payload:{...values}
        })
      }
    });    
  }
  handleTagsChange(e){
    
  }
  renderTabs(tabs){
    return(
      <Tabs defaultActiveKey="1">
      {tabs.map((item,i)=>(
        <TabPane tab={item.label} key={i+1}>
          {item.groups ? this.renderGroups(item.groups) :this.renderField(item.fields) }
        </TabPane>
      ))}
      </Tabs>
    )
  }
  renderGroups(groups){
    return(
      <div>
        {groups.map((item,i) => ( 
          <Card key={i+1} title={item.label}>
            {this.renderField(item.fields)}
          </Card>
        ))}
      </div>
    )
  }
  renderFormItem(field){
    return(
      <Input />
    );
  }
  renderField(fields){
    const {form:{getFieldDecorator}} = this.props;
    return(
      <div>
        {fields.map(item => (
          <FormItem key={item.name} {...formItemLayout} label={item.label}>
          {item.endfix ? (
            <Row>
              <Col span={18}>
                {getFieldDecorator(item.name,{
                  
                })(this.renderFormItem(item))}
              </Col>
              <Col span={6}>
                <span className="ant-form-text" style={{paddingLeft:'10px'}}> {item.endfix}</span>
              </Col>
            </Row>
          ):(
            <div>
            {getFieldDecorator(item.name,{
              
            })(this.renderFormItem(item))}
            </div>
          )}
          
          </FormItem>
        ))}
      </div>
    )
  }

  renderConfig(fields){
    return(
      <div>
        {fields.tabs && this.renderTabs(fields.tabs)}
        {fields.fields && this.renderField(fields.fields)}
        {fields.groups && this.renderGroups(fields.groups)}
      </div>
    )
  }
  render(){
    
    const submitFormLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 10,
          offset: 7,
        },
      },
    };

    const {form:{getFieldDecorator},loading} = this.props;
    return (
      <Card title="配置">
        <Form onSubmit={this.handleSubmit} >
          {this.renderConfig(Fields)}
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              提交
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}
export default PAGE_NAME_UPPER_CAMEL_CASE;