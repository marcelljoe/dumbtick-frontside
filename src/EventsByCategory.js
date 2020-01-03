import React, { Component } from "react";
import {
  Container,
  Card,
  Input,
  Divider,
  Header,
  Icon
} from "semantic-ui-react";
import HomeHeader from "./HomeHeader";
import Axios from "axios";
import moment from "moment";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import Cards from './Cards';
import {Link} from 'react-router-dom';
import { getEventsByCategory } from './Redux/_actions/EventsByCategoryActions';
import EventsByCategoryReducers from "./Redux/_reducers/EventsByCategoryReducers";
import {connect} from 'react-redux';

class EventsByCategory extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   eventse: [],
    //   eventDet:[]
    // };
  }
  componentDidMount() {
      const {id} = this.props.match.params;
    
    //this commented text below is for getting data using axios without redux
      //   console.log(id); 
    // Axios.get(`http://localhost:7000/dumbtick/category/${id}/events`).then(res => {
    //   const datae = res.data;
    //   console.log(res.data);
    //   this.setState({ eventse: datae });
    // });
    
    
    this.props.dispatch(getEventsByCategory(id));
  }

  render() {
    // const { eventse} = this.state;
    

    const currDate = moment().format("DD MMMM YYYY");
    console.log(currDate);

    return (
      <div>
        <HomeHeader />
        <Divider hidden />
        <Container>
          <Input fluid icon="search" placeholder="Search...." />
          {this.props.eventsbc.slice(0, 1).map((de, i) => (
            <Header as="h1" content={de.category.name} />
          ))}
          <p>Sort by:</p>
          <SemanticDatepicker locale="pt-BR" type="range" />
          <Divider hidden />
          <Card.Group itemsPerRow={3}>
            {this.props.eventsbc.map((de, i) => {
              const checkDate = new Date(de.startTime);
              const date = moment(checkDate).format("DD MMMM YYYY");
              console.log(date);
              return (
                <Cards
                  id={de.id}
                  img={de.img}
                  title={de.title}
                  price={`Rp${de.price}`}
                  description={de.description}
                  date={date}
                  link={"/event/" + de.id + "/detail"}
                />
              );
            })}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  eventsbc: state.EventsByCategoryReducers.eventsbc
});

export default connect(mapStateToProps)(EventsByCategory);