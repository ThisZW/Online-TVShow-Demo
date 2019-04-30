import React, { Component } from 'react';
import { Layout, Menu, Icon, Alert } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";
import {Home, UserList, User, Post, Show, ShowList, Login } from "./components";
const {
  Header, Footer, Sider, Content,
} = Layout;

class App extends Component{

  constructor(){
    super()
    this.state = {
      isLoggedIn: false,
      username: null,
      userId: null,
      loggingOut: false,
    }
  }

  handleLogout = () => {
    ['id', 'username'].forEach(val => {
      localStorage.removeItem(val)
    });
    this.setState({
      loggingOut: true
    }, () => {
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    })
  }
  
  //check localstorage and see if there is a username stored
  componentDidMount = () => {
    if(window.localStorage.getItem('username') && window.localStorage.getItem('id')){
      this.setState({
        isLoggedIn: true,
        username: window.localStorage.username,
        userId: window.localStorage.id
      })
    }
  }

  render(){
    const { isLoggedIn, username, userId, loggingOut } = this.state
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
              <Menu.Item key="home"><Link to="/"> Home </Link></Menu.Item> 
              <Menu.Item key="users"><Link to="/users"> Users </Link></Menu.Item>
              <Menu.Item key="shows"><Link to="/shows"> TV Shows </Link></Menu.Item>
              <Menu.Item key="my-shows"><Link to={`/user/${userId}`}> My Shows </Link></Menu.Item>
              { !isLoggedIn ?
                <Menu.Item className="menu-right" key="login"><Link to="/login"> Login </Link></Menu.Item>
                :
                <Menu.Item className="menu-right" key="logout" onClick={this.handleLogout}> Welcome! {username} Logout </Menu.Item> 
              }
            </Menu>
          </Header>
          <Content style={{width: '1200px', maxWitth: '100%', padding: '50px 100px', margin: 'auto'}}>
            { loggingOut &&
              <Alert message="Logging out!" type="success" showIcon />
            }
            <Route exact path="/" 
              render={
                () => <Home {...this.state} /> 
              } />
            <Route path="/users" 
              render={
                () => <UserList {...this.state} /> 
              } />
            <Route path="/user/:id(\d+)"
              render={
                (props) => <User {...props} {...this.state} /> 
              } />
            <Route path="/user/post" 
              render={
                () => <Post {...this.state} /> 
              } />
            <Route path="/show/:id(\d+)"
              render={
                (props) => <Show {...props} {...this.state} /> 
              } />
            <Route path="/shows"
              render={
                () => <ShowList {...this.state} /> 
              } />
            <Route path="/login"
              render={
                () => <Login {...this.state} /> 
              } />
          </Content>
        </Layout>
      </Router>
    );
  }
}

export default App;
