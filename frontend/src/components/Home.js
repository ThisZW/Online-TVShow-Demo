import React, { Component } from 'react';
import { Card} from 'antd';

export default class Home extends Component{
  render(){
    return(
    <div className="home">
      <Card bordered={false} style={{ width: 500, margin: '100px auto', padding: '100px 0', textAlign: 'center' }}>
        <h1>Welcome to the TV Show Watchlist app!</h1>
      </Card>
    </div>
    )
  }
}