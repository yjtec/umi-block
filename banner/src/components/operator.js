import React,{Component,Fragment} from 'react';
import {Card,Form,Row,Col,Button,Select} from 'antd';
import styles from '../index.css';
import AddBanner from './AddBanner';
const FormItem = Form.Item;
const {Option} = Select;
class BannerOperator extends Component{
  componentDidMount(){
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
  render(){
    const {
      form:{getFieldDecorator},
      statusData,
      platformData,
      typeData
    } = this.props;
    return(
      <Card className={styles.searchCard}>
        <Col md={20} sm={20} lg={20} sm={24}>
          <Form layout="inline" onSubmit={this.handleSearch}>
            <Row gutter={{ md: 6, lg: 12, xl: 48 }}>
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
                <Select style={{ width: 200 }} placeholder="请选择" >
                  {platformData.map(item => (
                    <Option key={item.id} value={item.id}>{item.title}</Option>
                  ))}
                </Select>
              )}
              </FormItem>
              <Form.Item label="分类">
                {getFieldDecorator('type')(
                  <Select style={{ width: 200 }} placeholder="请选择">
                    {typeData.map(item => (
                      <Option key={item.id} value={item.id}>{item.title}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <div className={styles.submitButtons}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
              </div>
            </Row>
          </Form>
        </Col>
        <Col md={4} sm={4} lg={4} sm={24}>
          <AddBanner platformData={platformData} typeData={typeData} />
        </Col>
      </Card>
    )
  }
}
const WrappedRegistrationForm = Form.create({name:'search_banner'})(BannerOperator);
export default WrappedRegistrationForm;