import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import { showByUserId } from '../api'
import Show from './Show';

export default class User extends Component{

  constructor(props) {
    super(props)
    this.state = {
      shows: []
    }
  }
  
  componentDidMount = () => {
    const {id}  = this.props.match.params
    showByUserId(id).then( res => {
      this.setState({
        shows: res.data
      })
    })
  }
  
  render(){
    const { shows } = this.state
    console.log(shows)
    return(
      <div className="user">
        { shows.length > 0 ?
          shows.map( show => {
            return <Row>
              <Col md={4} xs={8}>
                <img className="show-img" src={`/public/images/${show.imgUrl}`} alt="gof" />
              </Col>
              <Col md={20} xs={16}>
                <div className="show-desc">
                  <h2>{show.title}</h2>
                  <h3>{show.Genre.genreName}</h3>
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