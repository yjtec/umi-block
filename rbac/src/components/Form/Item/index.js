import React, {Component} from 'react';
import {Form,Button,Input,InputNumber,Select} from 'antd';
import Upload from './Upload';
class FI extends Component{
  render(){
    const {type,onChange} = this.props;
    if(type == 'text'){
      return <Input {...this.props} />
    }

    if(type == 'textarea'){
      const {TextArea} = Input;
      return <TextArea {...this.props} rows="4" />
    }

    if(type == 'image'){
      return <Upload {...this.props} />
    }

    if(type == 'number'){
      const {min,max} = this.props;
      return <InputNumber min={min} max={max} onChange={onChange} />
    }

    if(type == 'select'){
      const {items} = this.props;
      return (
        <div>
          <Select onChange={onChange}>
            {items.map(item => ( 
              <Option key={item.value} value={item.value}>{item.label}</Option>
            ))}
          </Select>
        </div>
      );
    }
  }
}

export default FI;