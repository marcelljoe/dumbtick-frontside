import React, { Component } from "react";
import { Card, Image, Icon, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Axios from 'axios';

export default class Cards extends Component {
  constructor(){
    super();
  }

  render() {
    return (
      <Card link>
        <Image src={this.props.img} wrapped ui={false} as={Link} to={this.props.link}/>
        <Card.Content>
          <Card.Header style={{ fontFamily: "Arkhip" }}>
            {this.props.title}
          </Card.Header>
          <Card.Meta>{this.props.price}</Card.Meta>
          <Card.Description>{this.props.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column>{this.props.date}</Grid.Column>
              <Grid.Column textAlign="right">
                
                <Icon name="heart"  />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}
