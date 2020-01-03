import React, { Component } from "react";
import {
  Header,
  Divider,
  Grid,
  Button,
  Form,
  Input,
  Container,
  Modal,
  Menu,
  Dropdown
} from "semantic-ui-react";
import Avatar from "react-avatar";
import HomeHeader from "./HomeHeader";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";

export default class AddEvent extends Component {
                 constructor() {
                   super();
                   this.state = {
                     title: "",
                     category_id: "",
                     startTime: "",
                     endTime: "",
                     price: "",
                     description: "",
                     address: "",
                     urlMaps: "",
                     img: "",
                     createdBy_id: "",
                     modalOpen: false
                   };
                 }

                 onChangeTitle = e => {
                   this.setState({ title: e.target.value });
                 };

                 onChangeCategory = e => {
                   this.setState({ category_id: e.target.value });
                 };

                 onChangeStartTime = e => {
                   this.setState({ startTime: e.target.value });
                 };

                 onChangeEndTime = e => {
                   this.setState({ endTime: e.target.value });
                 };

                 onChangePrice = e => {
                   this.setState({ price: e.target.value });
                 };

                 onChangeDesc = e => {
                   this.setState({ description: e.target.value });
                 };

                 onChangeAddress = e => {
                   this.setState({ address: e.target.value });
                 };

                 onChangeUrlMaps = e => {
                   this.setState({ urlMaps: e.target.value });
                 };

                 onChangeImg = e => {
                   this.setState({ img: e.target.value });
                 };

                 onSubmitEvent = e => {
                    const createdBy_id = localStorage.id;
                    const title = this.state.title;
                    const category_id = this.state.category;
                    const startTime = this.state.startTime;
                    const endTime = this.state.endTime;
                    const price = this.state.price;
                    const description = this.state.description;
                    const address = this.state.address;
                    const urlMaps = this.state.urlMaps;
                    const img = this.state.img;    

                   console.log(createdBy_id);
                   axios
                     .post("http://localhost:7000/dumbtick/addevent",
                       {
                         title: title,
                         category_id: category_id,
                         startTime: startTime,
                         endTime: endTime,
                         price: price,
                         description: description,
                         address: address,
                         urlMaps: urlMaps,
                         img: img,
                         createdBy_id: createdBy_id
                       })
                     .then(res => {
                         console.log(res.data);
                        alert("Event successfully added.") 
                        window.location.reload();
                     });
                 };

                //  componentDidMount() {
                //    if (localStorage.getItem("users")) {
                //      this.setState({
                //        name: localStorage.name
                //      });
                //    } else {
                //      this.setState({
                //        name: ""
                //      });
                //    }
                //  }

                 handleOpen = () => this.setState({ modalOpen: true });

                 handleClose = () => this.setState({ modalOpen: false });

                 render() {
                   return (
                     <Modal
                       trigger={
                         <Dropdown.Item
                           onClick={this.handleOpen}
                           floated="right"
                         >
                           Add Event
                         </Dropdown.Item>
                       }
                       open={this.state.modalOpen}
                       onClose={this.handleClose}
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
                             style={{ fontFamily: "Arkhip" }}
                             content="Add Event"
                           />
                           <Divider hidden />
                           <Grid textAlign="center">
                             <Grid.Row columns={2}>
                               <Grid.Column>
                                 <Form onSubmit={this.onSubmitEvent}>
                                   <Form.Field align="center" required>
                                     <Input
                                       size="small"
                                       type="text"
                                       placeholder="Title"
                                       value={this.state.title}
                                       onChange={this.onChangeTitle}
                                     />
                                   </Form.Field>
                                   <Form.Field align="center" required>
                                     <Input
                                       size="small"
                                       type="text"
                                       placeholder="Category"
                                       value={this.state.category_id}
                                       onChange={this.onChangeCategory}
                                     />
                                   </Form.Field>
                                   <Form.Field align="center" required>
                                     <Input
                                       size="small"
                                       type="datetime-local"
                                       placeholder="Start Time"
                                       value={this.state.startTime}
                                       onChange={this.onChangeStartTime}
                                     />
                                   </Form.Field>
                                   <Form.Field align="center" required>
                                     <Input
                                       size="small"
                                       type="datetime-local"
                                       placeholder="End Time"
                                       value={this.state.endTime}
                                       onChange={this.onChangeEndTime}
                                     />
                                   </Form.Field>
                                   <Form.Field align="center" required>
                                     <Input
                                       size="small"
                                       type="number"
                                       placeholder="Price"
                                       value={this.state.price}
                                       onChange={this.onChangePrice}
                                     />
                                   </Form.Field>
                                   <Form.Field align="center" required>
                                     <Input
                                       size="small"
                                       type="text"
                                       placeholder="Description"
                                       value={this.state.description}
                                       onChange={this.onChangeDesc}
                                     />
                                   </Form.Field>
                                   <Form.Field align="center" required>
                                     <Input
                                       size="small"
                                       type="text"
                                       placeholder="Address"
                                       value={this.state.address}
                                       onChange={this.onChangeAddress}
                                     />
                                   </Form.Field>
                                   <Form.Field align="center" required>
                                     <Input
                                       size="small"
                                       type="text"
                                       placeholder="Url Map"
                                       value={this.state.urlMaps}
                                       onChange={this.onChangeUrlMaps}
                                     />
                                   </Form.Field>
                                   <Form.Field align="center" required>
                                     <Input
                                       size="small"
                                       type="text"
                                       placeholder="Image Link"
                                       value={this.state.img}
                                       onChange={this.onChangeImg}
                                     />
                                   </Form.Field>
                                   <Button type="submit" basic color="orange">
                                     Add Event
                                   </Button>
                                 </Form>
                                 <Button
                                   color="orange"
                                   onClick={this.handleClose}
                                 >
                                   Cancel
                                 </Button>
                                 <Divider hidden />
                               </Grid.Column>
                             </Grid.Row>
                           </Grid>
                         </Container>
                       </Container>
                     </Modal>
                   );
                 }
               }
