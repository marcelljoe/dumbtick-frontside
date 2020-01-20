import React, {Component} from 'react';
import {Divider, Header, Card, Container, Item, Grid, Button} from 'semantic-ui-react';
import HomeHeader from './HomeHeader';
import Axios from 'axios';
import Avatar from 'react-avatar';
import moment from 'moment';
import Cards from './Cards';
import {Link} from 'react-router-dom';
import EditProfile from './EditProfile';
import Footer from './Footer';


export default class Profile extends Component {
    constructor(){
        super();
        this.state = {
            profile: [],
            favorites: [],

        };
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        Axios.get(`https://dumbtick-backend.herokuapp.com/dumbtick/profile/${id}`).then(res => {
            const datap = res.data;
            this.setState({profile: datap});
        });

        Axios.get(`https://dumbtick-backend.herokuapp.com/dumbtick/profile/${id}/favorites`).then(res => {
        console.log(res.data);
        this.setState({ favorites: res.data});                
        });
    }


    render(){
        const {profile, favorites} = this.state;
        return (
          <div style={{ backgroundColor: `rgba(180, 180, 180, 1)` }}>
            <HomeHeader />
            <Divider hidden />
            <Container>
              <Header
                as="h1"
                style={{ fontFamily: "Arkhip"}}
                content="Profile"
              />
              <Divider hidden />
              <Grid textAlign="center">
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Header style={{ fontSize: "32px" }}>
                      <p>{profile.name}</p>
                    </Header>
                    <p
                      style={{
                        fontSize: "20px",
                        padding: "0px"
                      }}
                    >
                      {profile.email}
                    </p>
                    <p
                      style={{
                        fontSize: "20px",
                        padding: "0px"
                      }}
                    >
                      {profile.phoneNumber}
                    </p>
                    <p
                      style={{
                        fontSize: "20px",
                        padding: "0px"
                      }}
                    >
                      {profile.dob}
                    </p>
                    <EditProfile />
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
            <Divider hidden />
            <Divider style={{ backgroundColor: "black", height: "1px" }} />
            <Container>
              <Header
                as="h1"
                style={{ fontFamily: "Arkhip" }}
                content="Favorites"
              />
              <Divider hidden />
              <Card.Group itemsPerRow={3}>
                {favorites.map((de, i) => {
                  const checkDate = new Date(de.event.startTime);
                  const date = moment(checkDate).format("DD MMMM YYYY");
                  return (
                    <Cards
                      id={de.event.id}
                      idFav={de.id}
                      img={de.event.img}
                      title={de.event.title}
                      price={`Rp${de.event.price}`}
                      description={de.event.description}
                      date={date}
                      link={`/event/${de.event.id}/detail`}
                    />
                  );
                })}
              </Card.Group>
            </Container>
            <Footer />
          </div>
        );
    }
}
