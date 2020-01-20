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
                     phoneNumber: "",
                     username: "",
                     password: "",
                     isLoggedIn: "",
                     img: "",
                     dob: ""
                   };
                 }

                 onChangeData = e => {
                   this.setState({ [e.target.name]: e.target.value });
                 };

                 onSubmitRegist = e => {
                   axios
                     .post("https://dumbtick-backend.herokuapp.com/dumbtick/register", {
                       name: this.state.name,
                       email: this.state.email,
                       phoneNumber: this.state.phoneNumber,
                       username: this.state.username,
                       password: this.state.password,
                       img: this.state.img,
                       dob: this.state.dob
                     })
                     .then(res => {
                       localStorage.setItem("id", res.data.id);
                       localStorage.setItem("username", res.data.username);
                       localStorage.setItem("token", res.data.token);
                       localStorage.setItem("name", res.data.name);
                       localStorage.setItem("isLoggedIn", 1);
                       window.location.reload();
                     })
                     .catch(res => {
                       alert("Username unavailable. Use another username.");
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
                       name: "",
                       email: "",
                       username: "",
                       password: "",
                       id: ""
                     });
                   }
                 }

                 //  componentWillUpdate(nextProps, nextState) {
                 //    localStorage.setItem("Fullname", JSON.stringify(nextState));
                 //  }

                 render() {
                   return (
                     <Modal
                       trigger={
                         <Button floated="right" style={{ color: 'orange', backgroundColor: 'black'}}>
                           REGISTER
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
                             <h1 align="center" style={{ color: 'orange'}}>REGISTER</h1>
                             <Form onSubmit={this.onSubmitRegist}>
                               <Form.Field align="center">
                                 <Input
                                   size="small"
                                   type="text"
                                   placeholder="Name"
                                   name="name"
                                   value={this.state.name}
                                   onChange={this.onChangeData}
                                 />
                               </Form.Field>
                               <Form.Field align="center">
                                 <Input
                                   size="small"
                                   type="email"
                                   placeholder="Email"
                                   name="email"
                                   value={this.state.email}
                                   onChange={this.onChangeData}
                                 />
                               </Form.Field>
                               <Form.Field align="center">
                                 <Input
                                   size="small"
                                   type="number"
                                   placeholder="Phone Number"
                                   name="phoneNumber"
                                   value={this.state.phoneNumber}
                                   onChange={this.onChangeData}
                                 />
                               </Form.Field>
                               <Form.Field align="center">
                                 <Input
                                   size="small"
                                   type="date"
                                   placeholder="Date of Birth"
                                   name="dob"
                                   value={this.state.dob}
                                   onChange={this.onChangeData}
                                 />
                               </Form.Field>
                               <Form.Field align="center">
                                 <Input
                                   size="small"
                                   type="text"
                                   placeholder="Image Link"
                                   name="img"
                                   value={this.state.img}
                                   onChange={this.onChangeData}
                                 />
                               </Form.Field>
                               <Form.Field align="center">
                                 <Input
                                   size="small"
                                   type="text"
                                   placeholder="Username"
                                   name="username"
                                   value={this.state.username}
                                   onChange={this.onChangeData}
                                 />
                               </Form.Field>
                               <Form.Field align="center">
                                 <Input
                                   size="small"
                                   type="password"
                                   placeholder="Password"
                                   name="password"
                                   value={this.state.password}
                                   onChange={this.onChangeData}
                                 />
                               </Form.Field>
                               <Form.Field align="center">
                                 <Button
                                   type="submit"
                                   color="black"
                                   size="small"
                                   style={{
                                    color: "black",
                                    background: "rgba(255, 165, 0, 1)"
                                 }}
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

