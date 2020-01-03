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
        console.log(this.state.username);
        axios
          .post("http://localhost:7000/dumbtick/login", {
            username,
            password
          })
          .then(res => {
            if(res.data.error){
              alert(res.data.message)
            }else {
                    console.log(res.data.users);
                    localStorage.setItem("id", res.data.id);
                    localStorage.setItem("username", res.data.username);
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("name", res.data.name);
                    localStorage.setItem("isLoggedIn", 1);
                    window.location.reload();
                  }
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
                username:'',
                password:'',
                id:''
            })
        }

    }


    // INI CARA LOGIN
    // handleLogin = () => {
    //     axios.post("http://localhost:4000/api/v1/login", {email: this.state.email, password: this.state.password})
    //     .then(res => {
    //         localStorage.setItem("token", res.data.token)
    //         localStorage.setItem("email", res.data.email)
    //     })
    // }

    // componentWillUpdate(nextProps, nextState) {
    //     localStorage.setItem('users', JSON.stringify(nextState));
    // }

    render(){
        return (
          <Modal
            trigger={<Button color="black" floated="right">Login</Button>}
            size="small"
            closeIcon
            dimmer="blurring"
          >
            <div class="ui form">
              <br />
              <div align="center">
                <div class="seven wide field">
                  <h1 align="center">LOGIN</h1>
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
                      <Button type="submit" color="black" size="small">
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