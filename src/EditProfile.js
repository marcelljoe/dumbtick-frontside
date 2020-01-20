import React, {Component} from 'react';
import {Header, Divider, Grid, Button, Form, Input, Container, Modal, Menu} from 'semantic-ui-react';
import Avatar from 'react-avatar';
import HomeHeader from './HomeHeader';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';


export default class EditProfile extends Component {
                 constructor() {
                   super();
                   this.state = {
                     name: "",
                     email: "",
                     phoneNumber: "",
                     dob: "",
                     modalOpen: false
                   };
                 }

                 componentDidMount() {
                   axios.get("")
                 }


                 onChangeName = e => {
                   this.setState({ name: e.target.value });
                 };

                 onChangeEmail = e => {
                   this.setState({ email: e.target.value });
                 };

                 onChangeNumber = e => {
                   this.setState({ phoneNumber: e.target.value });
                 };

                 onChangeDob = e => {
                   this.setState({ dob: e.target.value });
                 };

                 onSubmitProfile = e => {
                   const id = localStorage.id;
                   const name = this.state.name;
                   const email = this.state.email;
                   const phoneNumber = this.state.phoneNumber;
                   const dob = this.state.dob;

                   console.log(this.state.name);
                   axios
                     .put(
                       `https://dumbtick-backend.herokuapp.com/dumbtick/profile/${id}/edit`,
                       {
                         name,
                         email,
                         phoneNumber,
                         dob
                       },
                       {
                         where: {
                           id: localStorage.id
                         }
                       }
                     )
                     .then(res => {
                       localStorage.setItem("token", res.data.token);
                       localStorage.setItem("name", res.data.name);
                       localStorage.setItem("isLoggedIn", 1);
                       window.location.reload();
                     });
                 };

                 componentDidMount() {
                   if (localStorage.getItem("users")) {
                     this.setState({
                       name: localStorage.name
                     });
                   } else {
                     this.setState({
                       name: ""
                     });
                   }
                 }
                 handleOpen = () => this.setState({ modalOpen: true });

                 handleClose = () => this.setState({ modalOpen: false });

                 render() {
                   return (
                     <Modal
                       trigger={<Button onClick={this.handleOpen} floated="right" style={{color: 'black', backgroundColor: 'orange'}}>Edit Profile</Button>}
                       size="medium"
                       open={this.state.modalOpen}
                       onClose={this.handleClose}
                       style={{backgroundColor: `rgba(180, 180, 180, 1)`}}
                     >
                       <Container>
                         <div style={{ backgroundColor: "orange" }}>
                           <Container>
                             <Menu secondary>
                               <Menu.Item>
                                 <Header
                                   as="h1"
                                   style={{
                                     fontFamily: "Arkhip",
                                     marginLeft: "0px"
                                   }}
                                 >
                                   Dumb-Tick
                                 </Header>
                               </Menu.Item>
                             </Menu>
                           </Container>
                         </div>
                         <Divider hidden />
                         <Container>
                           <Header
                             textAlign="center"
                             as="h1"
                             style={{ fontFamily: "Arkhip"}}
                             content="Edit Your Profile"
                           />
                           <Divider hidden />
                           <Grid textAlign="center">
                             <Grid.Row columns={2}>
                               <Grid.Column>
                                 <Form onSubmit={this.onSubmitProfile}>
                                   
                                   <Form.Field align="center">
                                     <Input
                                       size="small"
                                       type="text"
                                       placeholder="Your Name"
                                       value={this.state.name}
                                       onChange={this.onChangeName}
                                     />
                                   </Form.Field>
                                   
                                   <Form.Field align="center">
                                     <Input
                                       size="small"
                                       type="email"
                                       placeholder="Your Email"
                                       value={this.state.email}
                                       onChange={this.onChangeEmail}
                                     />
                                   </Form.Field>
                                   <Form.Field align="center">
                                     <Input
                                       size="small"
                                       type="number"
                                       placeholder="Your Phone Number"
                                       value={this.state.phoneNumber}
                                       onChange={this.onChangeNumber}
                                     />
                                   </Form.Field>
                                   <Form.Field align="center">
                                     <Input
                                       size="small"
                                       type="date"
                                       placeholder="dob"
                                       value={this.state.dob}
                                       onChange={this.onChangeDob}
                                     />
                                   </Form.Field>
                                   <Button type="submit" basic color="orange">
                                     Save Changes
                                   </Button>
                                 </Form>
                                 <Button onClick={this.handleClose} style={{color:'black', backgroundColor: 'orange'}}>Cancel</Button>
                                 <Divider hidden />
                               </Grid.Column>
                               <Grid.Column>
                                 <Avatar
                                   style={{ alignSelf: "right" }}
                                   round
                                   size="220px"
                                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnCCdR113N9HQqUspfOtv686j9LkQu9G-1_5BNUI0WFE-n5yJ0&s"
                                   style={{
                                     backgroundSize: "cover",
                                     backgroundRepeat: "no-repeat",
                                     backgroundPosition: "50% 50%"
                                   }}
                                 />
                               </Grid.Column>
                             </Grid.Row>
                           </Grid>
                         </Container>
                       </Container>
                     </Modal>
                   );
                 }
               }
