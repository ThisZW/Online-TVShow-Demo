import React, { Component } from 'react'
import { Card, Row, Col } from 'antd'
import { userList } from '../api'

export default class UserList extends Component{
  
  constructor(props) {
    super(props)
    this.state = {
       users: []
    };
  };
  
  componentDidMount() {
    userList().then( res=> {
      this.setState({
        users: res.data
      })
    })
  }

  render(){
    const { isLoggedIn, username, userId } = this.props 
    const { users } = this.state
    return(
      <Row>
        <Col span="24">
          { !isLoggedIn ?
              <h3>Please Log in first</h3>
              :
              <h3>Welcome {username}, your id is {userId}</h3>
          }
        </Col>
        <Col span="24" style={{marginTop: 50}}>
          <h4>Master list of all users:</h4>
          {
            users.map(user => {
              return <a href={`/user/${user.id}`}><p>{user.id}: {user.username}</p></a>
            })
          }
        </Col>
      </Row>
    )
  }
}