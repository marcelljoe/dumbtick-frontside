import React, { Component } from "react";
import {
  Divider,
  Header,
  Card,
  Container,
  Item,
  Grid,
  Button,
  Menu,
  Image
} from "semantic-ui-react";
import HomeHeader from "./HomeHeader";
import Axios from "axios";
import moment from "moment";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import MyTickets from './MyTickets';
import PaymentPending from './PaymentPending';
import Footer from './Footer';


export default class Payment extends Component {
  constructor() {
    super();
    this.state = {
      pendingOrders: [],
      confirmedOrders: [],
      activeItem: 'Payment'
    };
  }


  componentDidMount() {
    const buyer_id = localStorage.id;
  
    Axios.post("https://dumbtick-backend.herokuapp.com/dumbtick/paymentpending", {
      buyer_id
    }).then(res => {
      console.log(res.data);
      this.setState({ pendingOrders: res.data });
    });

    Axios.post("https://dumbtick-backend.herokuapp.com/dumbtick/paymentconfirmed", {
      buyer_id
    }).then(res => {
      console.log(res.data);
      this.setState({ confirmedOrders: res.data });
    });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { pendingOrders, confirmedOrders, activeItem } = this.state;

    const imgQR = <Image size="small" style={{backgroundColor: "lightgrey", display: 'unset'}} src="https://i2.wp.com/www.simplifiedcoding.net/wp-content/uploads/2016/12/qr-code.png?resize=250%2C250&ssl=1"/>;
    return (
      <div style={{backgroundColor: `rgba(180, 180, 180, 1)`}}>
        <HomeHeader />
        <Divider hidden />
        <Container>
          <Header as="h1" style={{ fontFamily: "Arkhip" }} content="Payment" />
          <Divider hidden />
          <Menu tabular>
            <Menu.Item
              name="Payment"
              active={activeItem === "Payment"}
              onClick={this.handleItemClick}
              />
            <Menu.Item
              name="My Tickets"
              active={activeItem === "My Tickets"}
              onClick={this.handleItemClick}
              />
          </Menu>
          {this.state.activeItem === "Payment" ? (
            <Container style={{ width: "850px" }}>
              {pendingOrders.map((de, i) => (
                <PaymentPending
                  id={de.id}
                  startTime={de.event.startTime}
                  name={de.user.name}
                  status={de.status}
                  price={de.event.price}
                  title={de.event.title}
                  address={de.event.address}
                  quantity={de.quantity}
                  totalPrice={de.totalPrice}
                />
              ))}
            </Container>
          ) : (
            <Container style={{ width: "850px" }}>
              {confirmedOrders.map((de, i) => (
                <MyTickets
                  id={de.id}
                  startTime={de.event.startTime}
                  name={de.user.name}
                  status={de.status}
                  price={de.event.price}
                  title={de.event.title}
                  address={de.event.address}
                  quantity={de.quantity}
                  totalPrice={de.totalPrice}
                />
              ))}
            </Container>
          )}
        </Container>
        <Footer/>
      </div>
    );
  }
}
