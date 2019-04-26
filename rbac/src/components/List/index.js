import React, {Component} from 'react';
import {Table} from 'antd';
export default class PageList extends Component{
  handleChange = (pagination) => {
    console.log(pagination);
    if(this.props.onChange){
      this.props.onChange({
        page:pagination.current,
        pageSize:pagination.pageSize
      });
    } 
    
  }
  render(){
    const {field:{columns},data,pagination} = this.props;
    const tableColumns = Object.keys(columns).map(item => {
      var obj = { 
        title:columns[item].label,
        dataIndex:item,
        key:item
      };
      if(columns[item].render){
        obj.render = columns[item].render;
      }
      return obj;
    });
    
    return(
      <Table 
        rowKey="id" 
        columns={tableColumns} 
        pagination={pagination}
        onChange = {this.handleChange} 
        dataSource={data} />
    );
  }
}