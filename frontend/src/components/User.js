import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import { showByUserId } from '../api'

export default class User extends Component{

  constructor(props) {
    super(props)
    this.state = {
      shows: []
    }
  }
  
  componentDidMount = () => {
    showByUserId(1).then( shows => {
      this.setState({
        shows
      })
    })
  }
  
  render(){
    const { shows } = this.state
    return(
      <div className="user">
        { shows.length > 0 ?
          shows.map( show => {
            return <Row>
              <Col md={4} xs={8}>
                <img className="show-img" src="/shows-img/gof.jpg" alt="gof" />
              </Col>
              <Col md={20} xs={16}>
                <div className="show-desc">
                  <h2>Game of Throne</h2>
                  <h3>Action</h3>
                </div>
              </Col>
            </Row>
          }) :
          <h3>No shows for this user yet!</h3>
        }
      </div>
    )
  }
}