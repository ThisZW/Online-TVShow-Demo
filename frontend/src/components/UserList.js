import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';

export default class UserList extends Component{
  render(){
    const { isLoggedIn, username, userId } = this.props 
    return(
      <Row>
        <Col span="24">
          { !isLoggedIn ?
              "Please Log in first"
              :
              "Welcome {username}, your id is {userId}"
          }
        </Col>
        <Col span="24" style={{marginTop: 50}}>
          Master list of all users:
        </Col>
      </Row>
    )
  }
}