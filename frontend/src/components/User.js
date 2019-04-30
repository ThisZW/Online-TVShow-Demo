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
        <Row type="flex" align="middle">
        { shows.length > 0 ?
          shows.map( show => {
            return <Col span={12}>
              <Row>
                <a href={`/show/${show.id}`}>
                  <Col span={12}>
                    <img className="show-img" src={`/public/images/${show.imgUrl}`} alt="gof" />
                  </Col>
                  <Col span={12}>
                    <div className="show-desc">
                      <h2>{show.title}</h2>
                      <h3>{show.Genre.genreName}</h3>
                    </div>
                  </Col>
                </a>
              </Row>
            </Col>
          }) :
          <h3>No shows for this user yet!</h3>
        }
        </Row>
      </div>
    )
  }
}