import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';

export default class User extends Component{
  render(){
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
      </div>
    )
  }
}