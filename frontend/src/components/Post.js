import React, { Component } from 'react';
import { Row, Col, Form, Input, Icon, Upload, Select, Button, Alert} from 'antd'
import { genres, addShow } from '../api'

class Post extends Component{
  
  constructor(props) {
    super(props)
    this.state = {
       genres : [],
       imageLoading: false,
       fileList: [],
       submitSuccess: false
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let bodyFormData = new FormData();
        bodyFormData.append('image', values.image.file)
        bodyFormData.set('userId', this.props.userId)
        bodyFormData.set('genreId', values.genreId)
        bodyFormData.set('title', values.title)
        addShow(bodyFormData).then( res =>{
          console.log(res)
          this.setState({
            submitSuccess: true
          }, () => {
            setTimeout(() => {
              window.location.href = `/user/${this.props.userId}`
            }, 2000)
          })
        })
      }
    });
  }

  componentDidMount = () => {
    genres().then( res => {
      this.setState({
        genres: res.data
      })
    })
  }

  render(){

    const { getFieldDecorator } = this.props.form
    const { genres, fileList, submitSuccess } = this.state

    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
          alert('You can only upload JPG file!');
          return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          alert('Image must smaller than 2MB!');
          return false;
        }
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return(
      <div className="user-post">
        <Row>
          <Col lg={12} sm={18}>
            { submitSuccess &&
              <Alert message="Submitted! redirecting back!" type="success" showIcon />
            }
            <Form onSubmit={this.handleSubmit} className="login-form">
              <h2> Add a new show to watch: </h2>

              <Form.Item>
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Text Title Input!' }],
                })(
                  <Input placeholder="Text Title Input!" />
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('image', {
                  rules: [{ required: true, message: 'Input your file first' }],
                })(
                  <Upload {...props}>
                    {
                      fileList.length === 0 &&
                      <Button>
                        <Icon type="upload" /> Select File
                      </Button>
                    }
                  </Upload>
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('genreId', {
                  rules: [{ required: true, message: 'Please select your gerne' }],
                })(
                    <Select
                      style={{ width: '100%' }}
                      placeholder="Genre Selection"
                      onChange={this.handleChange}
                    >
                      {genres.map( genre => 
                        <Select.Option key={genre.id} value={genre.id}>{genre.genreName}</Select.Option>
                      )}
                    </Select>
                )}
              </Form.Item>

              <Button htmlType="submit"> Submit </Button>

            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form.create({ name: 'post' })(Post);