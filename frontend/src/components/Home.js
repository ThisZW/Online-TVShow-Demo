import React, { Component } from 'react';
import { Card} from 'antd';

export default class Home extends Component{
  render(){
    return(
    <div className="home">
      <Card bordered={false} style={{ width: 500, margin: '50px auto', textAlign: 'center' }}>
        <h2>Welcome to the TV Show Watchlist app!</h2>
      </Card>
    </div>
    )
  }
}