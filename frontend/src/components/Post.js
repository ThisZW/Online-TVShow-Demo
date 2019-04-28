import React, { Component } from 'react';
import { Card, Row, Col, Form, Input, Icon, Upload, Select, Button} from 'antd';

class Post extends Component{
  
  handleSubmit = () => {

  }

  handleChange = () => {

  }

  render(){
    const { getFieldDecorator } = this.props.form
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Select.Option key={i.toString(36) + i}>{i.toString(36) + i}</Select.Option>);
    }
    return(
      <div className="user-post">
        <Row>
          <Col lg={12} sm={18}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <h2> Add a new show to watch: </h2>
              <Form.Item>
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Text Title Input!' }],
                })(
                  <Input placeholder="Text Title Input!" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('image', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload name="logo" listType="picture">
                    <Button>
                      <Icon type="upload" /> Upload your image file
                    </Button>
                  </Upload>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('Genre', {
                  rules: [{ required: true, message: 'Please select your gerne' }],
                })(
                    <Select
                      style={{ width: '100%' }}
                      placeholder="Genre Selection"
                      onChange={this.handleChange}
                    >
                      {children}
                    </Select>
                )}
              </Form.Item>
              <Button htmlType="submit"> Submit </Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form.create({ name: 'post' })(Post);