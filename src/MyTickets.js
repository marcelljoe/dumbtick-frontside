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
import Avatar from "react-avatar";
import moment from "moment";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";

export default class Profile extends Component {
  render() {
    const imgQR = (
      <Image
        size="small"
        style={{ backgroundColor: "lightgrey", display: "unset" }}
        src="https://i2.wp.com/www.simplifiedcoding.net/wp-content/uploads/2016/12/qr-code.png?resize=250%2C250&ssl=1"
      />
    );
    const dateSS = new Date(this.props.startTime);
    const dateS = moment(dateSS).format("DD MMMM YYYY");
    const timeS = moment(dateSS).format("hh:mm");
    return (
      <div>
        <Container style={{ backgroundColor: "orange" }}>
          <Container
            style={{
              width: "750px",
              padding: "30px",
              backgroundColor: "lightgrey"
            }}
          >
            <Grid columns={2}>
              <Grid.Row
                style={{
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  marginTop: "15px"
                }}
              >
                <Grid.Column>
                  <Header as="h4">{this.props.name}</Header>
                  <p>{this.props.quantity} Ticket(s)</p>
                </Grid.Column>
                <Grid.Column textAlign="right">
                  <p>Rp{this.props.price}/Ticket</p>
                  <p>{this.props.status}</p>
                </Grid.Column>
              </Grid.Row>
              <Divider style={{ margin: "5px" }} />
              <Grid.Row style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                <Grid.Column>
                  <Header as="h4">{this.props.title}</Header>
                  <p>
                    {dateS} at {timeS}
                  </p>
                  <p>{this.props.address}</p>
                </Grid.Column>
                <Grid.Column textAlign="right">{imgQR}</Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Container>
        <Divider />
      </div>
    );
  }
}
