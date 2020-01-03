import React, { Component } from "react";
import { Card, Image, Grid, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class CardDetail extends Component {
  render() {
    return (
      <Card>
        <Image src={this.props.img} wrapped ui={false} />
        <Card.Content>
          <Card.Header
            as="h1"
            style={{ fontSize: "46px", fontFamily: "Arkhip" }}
          >
            {this.props.title}
          </Card.Header>
          <Card.Header as="h1" style={{ fontSize: "32px", color: "orange" }}>
            <Grid columns={2}>
              <Grid.Column floated="left">{this.props.price}</Grid.Column>
              <Grid.Column textAlign="right">
                {this.props.price}
                <Button size="tiny">-</Button>
                
                <Button size="tiny">+</Button>
              </Grid.Column>
            </Grid>
          </Card.Header>
        </Card.Content>
        <Card.Content extra>{this.props.date}</Card.Content>
        <Card.Content>
          <Card.Description>{this.props.description}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
