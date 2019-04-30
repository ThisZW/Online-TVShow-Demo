import React, { Component } from 'react'
import { Col, Row, Form, Input, Button, Alert } from 'antd';
import { login } from '../api'

class Login extends Component{
  
  constructor(props) {
    super(props)
    this.state = {
       loginSuccess: false
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        login(values).then( res => {
          window.localStorage.setItem('id', res.data.id)
          window.localStorage.setItem('username', res.data.username)
          this.setState({
            loginSuccess: true
          }, () => {
            setTimeout(() => {
              window.location.href = "/"
            }, 3000)
          })
        });
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form
    const { loginSuccess } = this.state
    return(
      <Row>
        <Col>
          { loginSuccess && 
            <Alert message="Login Successfully, page will redirect back to home page" type="success" showIcon />
          }
        </Col>
        <Col>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <h3> Enter your username to login </h3>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Type your username!' }],
              })(
                <Input placeholder="Type your username!" />
              )}
            </Form.Item>
            <Button htmlType="submit"> Login </Button>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default Form.create({ name: 'login-form' })(Login);
