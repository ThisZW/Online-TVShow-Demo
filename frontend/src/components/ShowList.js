import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { shows } from '../api'

export default class ShowList extends Component{

  constructor(props) {
    super(props)
    this.state = {
      shows: null
    }
  }
  
  componentDidMount = () => {
    shows().then(res => {
      this.setState({
        shows: res.data
      })
    }).catch(err => {
      alert(err.responds)
    })
  }
  
  render(){
    const {shows} = this.state
    return(
    <div>
      <Row>
        <Col>
          <h2> Master List of TV Shows </h2>
        </Col>
        <Col>
        { shows &&
          Object.keys(shows).map(title => {
            return <div>
              <h3>- {title}</h3>
                <h4>&nbsp;&nbsp; Who's watching? 
                {
                  shows[title].map(val => {
                    return <a href={`/user/${val.id}`}> {val.username} </a>
                  })
                }
                </h4>
              </div>
          })
        }
        </Col>
      </Row>
    </div>
    )
  }
}