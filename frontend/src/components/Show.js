import React, { Component } from 'react';
import { Card, Row, Col, Form, Input, Button, Alert} from 'antd';
import { showById, addComment } from '../api'
class Show extends Component{

  constructor(props) {
    super(props)
    this.state = {
      data: null,
      submitSuccess: null
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const form = {
          ...values,
          userId: this.props.userId,
          showId: this.props.match.params.id
        }
        addComment(form).then( res =>{
          console.log(res)
          this.setState({
            submitSuccess: true
          }, () => {
            this.loadShowData()
            setTimeout(() => {
              this.setState({ //disable the alert
                submitSuccess: false
              })
            }, 2000)
          })
        })
      }
    });
  }

  loadShowData = () => {
    showById(this.props.match.params.id).then( res => {
      this.setState({
        data: res.data
      })
    })
  }

  componentDidMount() {
    this.loadShowData()
  }

  render(){
    const { getFieldDecorator } = this.props.form
    const { data, submitSuccess } = this.state
    return(
      <div>
      { submitSuccess &&
        <Alert message="Submitted!" type="success" showIcon />
      }
      { data ?
      <div className="user">
        <Row>
          <Col md={6} xs={12}>
            <img className="show-img" src={`/public/images/${data.imgUrl}`} alt={data.title} />
          </Col>
          <Col md={18} xs={12}>
            <div className="show-desc">
              <h2>{data.title}</h2>
              <h3>{data.Genre.genreName}</h3>
            </div>
          </Col>
        </Row>
        <div>
          Being Watched by {data.User.username}
        </div>
        <hr/>
        <Row>
          <Col lg={12} sm={18}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('comment', {
                  rules: [{ required: true, message: 'Insert a new comment!' }],
                })(
                  <Input placeholder="Insert a new comment!" />
                )}
              </Form.Item>
              <Button htmlType="submit"> Submit </Button>
            </Form> 
          </Col>
        </Row>
        <br/>
        <h3>
          Comments:
        </h3>
        {data.Comments.map(comment => {
          return <div>{comment.User.username}: {comment.commentBody}</div>
        })}
      </div>
      : <h3>No data</h3>
      }
      </div>
    ) 
  }
}

export default Form.create({ name: 'show-post-comment' })(Show);