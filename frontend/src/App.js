import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";
import {Home, UserList, User, Post, Show, ShowList } from "./components";
const {
  Header, Footer, Sider, Content,
} = Layout;

class App extends Component{

  constructor(){
    super()
    this.state = {
      isLoggedin: false,
      username: null,
      userId: null
    }
  }

  //check localstorage and see if there is a username stored
  componentDidMount = () => {
    if(window.localStorage.getItem('username')){
      this.setState({
        isLoggedin: true,
        username: window.localStorage.username,
        id: window.localStorage
      })
    }
  }

  render(){
    const { isLoggedin, username, userId } = this.state
    return (
      <Router>
        <Layout>
          <Header className="header">
            <div className="logo">
              <Icon type="video-camera" />
              <h3>&nbsp;&nbsp;TV Show Watchlist</h3>
            </div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px'}}
            >
              <Menu.Item key="home">Home</Menu.Item>
              <Menu.Item key="users">Users</Menu.Item>
              <Menu.Item key="tv-shows">TV Shows</Menu.Item>
              <Menu.Item key="generes">Generes</Menu.Item>
              <Menu.Item key="login"></Menu.Item>
              <Menu.Item key="logout"></Menu.Item>
            </Menu>
          </Header>
          <Content style={{maxWidth: '1200px', padding: '50px 100px'}}>
            <Route exact path="/" component={Home} />
            <Route path="/users" component={UserList} />
            <Route path="/user/:id(\d+)" component={User} />
            <Route path="/user/post" component={Post} />
            <Route path="/show/:id(\d+)" component={Show} />
            <Route path="/shows" component={ShowList} />
          </Content>
        </Layout>
      </Router>
    );
  }
}

export default App;
