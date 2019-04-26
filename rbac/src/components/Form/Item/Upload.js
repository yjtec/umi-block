import React, {Component} from 'react';
import {Upload,Icon,Button,message} from 'antd';
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const type = ['image/jpeg','image/png'];
  const isType = type.indexOf(file.type);
  if (!isType) {
    message.error('You can only upload JPG PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isType && isLt2M;
}
export default class Item extends Component{
  state = {
    loading: false,
  };

  handleChange = (info) => {
    const {onChange} = this.props;
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.props.onChange(imageUrl);
        this.setState({
          imageUrl,
          loading: false,
        })
      });
    }
  }
  render(){
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="//jsonplaceholder.typicode.com/posts/"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img style={{width:'80px'}} src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );
    
  }
}