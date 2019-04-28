import React, { Component } from 'react';
import { Card, Row, Col, Form, Input, Button} from 'antd';

class Show extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return(
      <div className="user">
        <Row>
          <Col md={6} xs={12}>
            <img className="show-img" src="/shows-img/gof.jpg" alt="gof" />
          </Col>
          <Col md={18} xs={12}>
            <div className="show-desc">
              <h2>Game of Throne</h2>
              <h3>Action</h3>
            </div>
          </Col>
        </Row>
        <div>
          Being Watched by 
        </div>
        <hr/>
        <Row>
          <Col lg={12} sm={18}>
            <Form>
              <Form.Item>
                {getFieldDecorator('comment', {
                  rules: [{ required: true, message: 'Insert a new comment!' }],
                })(
                  <Input placeholder="Text Title Input!" />
                )}
              </Form.Item>
              <Button htmlType="submit"> Submit </Button>
            </Form> 
          </Col>
        </Row>
        <br/>
        <h3>
          Comments:
        </h3>
        <div>
          test2
        </div>
        <div>
          test2
        </div>
      </div>
    ) 
  }
}

export default Form.create({ name: 'show-post-comment' })(Show);