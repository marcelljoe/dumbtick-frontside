import _ from 'lodash';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Form, Input, Grid, Image, Button, Header, Icon, Modal, Message} from 'semantic-ui-react';
import Login from './Login';
import './App.css';
import axios from 'axios';


const columns = _.times(16, (i) => (
    <Grid.Column key={i}>
    <Image src='/images/wireframe/image.png' />
    </Grid.Column>
))
const InputExampleInput = () => <Input placeholder=""/>

const GridExampleGrid = () => 
<Grid>{columns}</Grid>

export default class Registration extends Component {
                 constructor(props) {
                   super(props);
                   //  this.onSubmit = this.onSubmit.bind(this);

                   this.state = {
                     name: "",
                     email: "",
                     username: "",
                     password: "",
                     isLoggedIn: ""
                   };
                 }

                 onChangeName = e => {
                   this.setState({ name: e.target.value });
                 };

                 onChangeEmail = e => {
                   this.setState({ email: e.target.value });
                 };

                 onChangeUsername = e => {
                   this.setState({ username: e.target.value });
                 };

                 onChangePassword = e => {
                   this.setState({ password: e.target.value });
                 };

                 onSubmitRegist = e => {
                   axios
                     .post("http://localhost:7000/dumbtick/register", {
                       name: this.state.name,
                       email: this.state.email,
                       username: this.state.username,
                       password: this.state.password
                     })
                     .then(res => {
                      localStorage.setItem("token", res.data.token);
                      localStorage.setItem("username", res.data.username);
                      localStorage.setItem("isLoggedIn", 1);
                      window.location.reload();
                     });
                 };

                 componentDidMount() {
                   //  this.userData = JSON.parse(localStorage.getItem("Fullname"));

                   if (localStorage.getItem("name")) {
                     this.setState({
                       name: this.state.name,
                       email: this.state.email,
                       username: this.state.username,
                       password: this.state.password
                     });
                   } else {
                     this.setState({
                       name: '',
                       email: '',
                       username: '',
                       password: ''
                     });
                   }
                 }

                 //  componentWillUpdate(nextProps, nextState) {
                 //    localStorage.setItem("Fullname", JSON.stringify(nextState));
                 //  }

                 render() {
                   return (
                     <Modal
                       trigger={<Button color="black" floated="right">Register</Button>}
                       size="small"
                       closeIcon
                       dimmer="blurring"
                     >
                       <div class="ui form">
                         <br />
                         <div align="center">
                           <div class="seven wide field">
                             <h1 align="center">REGISTER</h1>
                             <Form onSubmit={this.onSubmitRegist}>
                               <Form.Field align="center">
                                 <Input
                                   size="small"
                                   type="text"
                                   placeholder="Name"
                                   value={this.state.name}
                                   onChange={this.onChangeName}
                                 />
                               </Form.Field>
                               <Form.Field align="center">
                                 <Input
                                   size="small"
                                   type="email"
                                   placeholder="Email"
                                   value={this.state.email}
                                   onChange={this.onChangeEmail}
                                 />
                               </Form.Field>
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
                                   placeholder="Psswrd"
                                   value={this.state.password}
                                   onChange={this.onChangePassword}
                                 />
                               </Form.Field>
                               <Form.Field align="center">
                                 <Button
                                   type="submit"
                                   color="black"
                                   size="small"
                                 >
                                   Register
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

