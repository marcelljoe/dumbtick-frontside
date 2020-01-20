import React, { Component } from "react";
import { Card, Image, Icon, Grid, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Axios from 'axios';

export default class Cards extends Component {
  constructor(){
    super();
    this.state = {
        favorited: false
    }
  }

  componentDidMount(){
    if(localStorage.getItem("id") == null ){
    } else {
        Axios.post("https://dumbtick-backend.herokuapp.com/dumbtick/favorites", {
          user_id: localStorage.id,
          event_id: this.props.id
        }).then(res => {
          this.setState({ favorited: res.data.isFav });
          console.log(res.data.isFav);
        });
    }
   
  }

  tagFavorited = () => {
    if(this.state.favorited === true){
      Axios.post("https://dumbtick-backend.herokuapp.com/dumbtick/dropfavorite", 
      {
        user_id: localStorage.id,
        event_id: this.props.id
      }
      )
      .then(res => {
        this.setState({favorited: res.data.isFav});

      });
    } else {
      Axios.post("https://dumbtick-backend.herokuapp.com/dumbtick/addfavorite", {
        user_id: localStorage.id,
        event_id: this.props.id
      })
      .then(res => {
        this.setState({ favorited: res.data.isFav });
      });
    }
  }




  render() {
    return (
      <Card link color="orange" style={{ backgroundColor: "rgba(50, 50, 50, 1)" }}>
        <Image
          src={this.props.img}
          wrapped
          ui={false}
          as={Link}
          to={this.props.link}
        />
        <Card.Content>
          <Card.Header style={{ fontFamily: "Arkhip", color: 'orange' }}>
            {this.props.title}
          </Card.Header>
          <Card.Meta style={{ color: 'orange' }}>{this.props.price}</Card.Meta>
          <Card.Description style={{ color: 'orange' }}>{this.props.description}</Card.Description>
        </Card.Content>
        <Divider style={{ backgroundColor: "black", height: "1px" }} />
        <Card.Content extra>
          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column style={{ color: 'orange' }}>{this.props.date}</Grid.Column>

              <Grid.Column textAlign="right">
                {this.state.favorited ? (
                  <Icon
                    name="heart"
                    color="orange"
                    onClick={this.tagFavorited}
                  />
                ) : (
                  <Icon name="heart" color="grey" onClick={this.tagFavorited} />
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}
