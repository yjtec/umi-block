import React,{Component,Fragment} from 'react';
import {Form,Row,Col,Button,Select} from 'antd';
import styles from '../index.css';
import AddBanner from './AddBanner';
const FormItem = Form.Item;
const {Option} = Select;
class BannerOperator extends Component{
  componentDidMount(){
    // const {dispatch} = this.props;
    // dispatch({
    //   type:'BLOCK_NAME_CAMEL_CASE/fetchType'
    // })
  }
  handleSearch = e => {
    e.preventDefault();
    const {form,onSubmit} = this.props;
    form.validateFields((err,values) => {
      const params = {};
      Object.keys(values).map(item => {
        if(values[item]){
          params[item] = values[item];
        }
      })
      onSubmit(values);
    })
  }
  handleFormReset = e => {
    const {form,onSubmit} = this.props;
    form.resetFields();
    onSubmit({});
  }
  handleAddBanner = () => {

  }
  render(){
    const {
      form:{getFieldDecorator},
      statusData,
      typeData
    } = this.props;
    return(
      <Form layout="inline" onSubmit={this.handleSearch}>
        <Row gutter={{ md: 6, lg: 12, xl: 48 }}>
          <Col md={24} sm={24}>
            <FormItem label="状态">
            {getFieldDecorator('status')(
              <Select style={{ width: 120 }} placeholder="请选择" >
                {Object.keys(statusData).map(item => (
                  <Option key={item} value={item}>{statusData[item].label}</Option>
                ))}
              </Select>
            )}
            </FormItem>
            <FormItem label="平台">
            {getFieldDecorator('platform')(
              <Select style={{ width: 120 }} placeholder="请选择" >
                {typeData.map(item => (
                  <Option key={item.id} value={item.id}>{item.title}</Option>
                ))}
              </Select>
            )}
            </FormItem>
            <div className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </div>
            <AddBanner typeData={typeData} />
          </Col>
        </Row>
      </Form>
    )
  }
}
const WrappedRegistrationForm = Form.create({name:'search_banner'})(BannerOperator);
export default WrappedRegistrationForm;