import _ from 'lodash';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Container, Form, Input, Grid, Image, Button, Header, Icon, Modal} from 'semantic-ui-react';
import axios from 'axios';


const columns = _.times(16, (i) => (
    <Grid.Column key={i}>
    <Image src='/images/wireframe/image.png' />
    </Grid.Column>
))

export default class Login extends Component{
    
    // userData;
    
    constructor(props){
        super(props);

        this.state = {
            id: '',
            username: '',
            password: '',
            isLoggedIn: ''
        }
    }

    onChangeUsername = (e) => {
        this.setState({ username: e.target.value})
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value})
    }
   
    onSubmitLogin = (e) => {
        const username = this.state.username;
        const password = this.state.password;
        axios
          .post("https://dumbtick-backend.herokuapp.com/dumbtick/login", {
            username,
            password
          })
          .then(res => {
            if(res.data.error === true) {
              alert(res.data.message);
            }else{
            const data = res.data;
            console.log(res.data);
            const token = res.data.token;
            localStorage.setItem("id", data.id);
            localStorage.setItem("name", data.name);
            localStorage.setItem("username", data.username);
            localStorage.setItem("token", token);
            localStorage.setItem("isLoggedIn", 1);
            alert(res.data.message);
            window.location.href = "http://localhost:3000/";

            }

            }).catch(res => {
            alert("Login failed.");
          });
    }
    
    componentDidMount(){
        // this.userData = JSON.parse(localStorage.getItem('users'));
        
        if(localStorage.getItem('users')) {
            this.setState({
              id: localStorage.id,
              name: localStorage.name,
              username: localStorage.username,
              password: localStorage.password
            })
        }else{
            this.setState({
                name: '',
                email: '',
                username:'',
                password:'',
                id:''
            })
        }

    }

    render(){
        return (
          <Modal
            trigger={
                                   <Button floated="right" style={{ color: 'orange', backgroundColor: 'black'}}>  
                LOGIN
              </Button>
            }
            size="small"
            closeIcon
            dimmer="blurring"
            style={{ color: "orange", background: "rgba(100, 100, 100, 1)" }}
          >
            <div class="ui form">
              <br />
              <div align="center">
                <div class="seven wide field">
                  <h1 align="center" style={{ fontFamily: "Arkhip" }}>
                    LOGIN
                  </h1>
                  <Form onSubmit={this.onSubmitLogin}>
                    <Form.Field align="center">
                      <Input
                        size="small"
                        type="text"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                      />
                    </Form.Field>
                    <Form.Field align="center">
                      <Input
                        size="small"
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                      />
                    </Form.Field>
                    <Form.Field align="center">
                      <Button
                        type="submit"
                        size="small"
                        style={{
                          color: "black",
                          background: "rgba(255, 165, 0, 1)"
                        }}
                      >
                        Sign In
                      </Button>
                    </Form.Field>
                    <Form.Field></Form.Field>
                  </Form>
                </div>
              </div>
            </div>
          </Modal>
        );
    }
}
