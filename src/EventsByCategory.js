import React, { Component } from "react";
import {
  Container,
  Card,
  Input,
  Divider,
  Header,
  Icon,
  Button
} from "semantic-ui-react";
import HomeHeader from "./HomeHeader";
import Axios from "axios";
import moment from "moment";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Cards from './Cards';
import {Link} from 'react-router-dom';
import { getEventsByCategory } from './Redux/_actions/EventsByCategoryActions';
import EventsByCategoryReducers from "./Redux/_reducers/EventsByCategoryReducers";
import {connect} from 'react-redux';
import Footer from "./Footer";


class EventsByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      datepicked: ""
      //   eventse: [],
      //   eventDet:[]
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;

    //this commented text below is for getting data using axios without redux
    //   console.log(id);
    // Axios.get(`http://localhost:7000/dumbtick/category/${id}/events`).then(res => {
    //   const datae = res.data;
    //   console.log(res.data);
    //   this.setState({ eventse: datae });
    // });

    this.props.dispatch(getEventsByCategory(id));
  }

  onChangeSearch = event => {
    this.setState({ search: event.target.value });
  };

  onChangeDate = date => {
    this.setState({datepicked: date});
  }

  Clear = () => {
    this.setState({datepicked: ""});
  }


  


  render() {
    const currDate = moment().format("DD MMMM YYYY");
    console.log(currDate);
    const { search, datepicked } = this.state;

    const sortEvent = this.props.eventsbc.filter(eventsbc => {
      return(
        moment(new Date(eventsbc.startTime)).format("YYYY-MM-DD") ===
        moment(this.state.datepicked).format("YYYY-MM-DD")
      );
    })

    const filteredEventsCategory = this.props.eventsbc.filter(eventsbc => {
      return eventsbc.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    return (
      <div style={{ backgroundColor: `rgba(180, 180, 180, 1)` }}>
        <HomeHeader />
        <Divider hidden />
        <Container>
          <Input
            fluid
            icon="search"
            placeholder="Search...."
            onChange={this.onChangeSearch}
          />
          {this.props.eventsbc.slice(0, 1).map((de, i) => (
            <Header
              as="h1"
              content={de.category.name}
              style={{ fontFamily: "Arkhip" }}
            />
          ))}
          <p>Sort by:</p>
          <DatePicker
            selected={this.state.datepicked}
            onChange={this.onChangeDate}
          />
          <Button content="Clear" size="tiny" onClick={this.Clear} style={{color: 'black', backgroundColor: 'orange'}}/>
          <Divider hidden />

          {datepicked != "" ? (
            <Container>
              <Card.Group itemsPerRow={3}>
                {sortEvent.map((de, i) => {
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
          ) : (
            
            // <Header
            //   as="h1"
            //   content="No data found"
            //   style={{ fontFamily: "Arkhip" }}
            // />
         search ? (
            <Card.Group itemsPerRow={3}>
              {filteredEventsCategory.map((de, i) => {
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
          ) : (
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
          )
 

            
          )}
        </Container>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  eventsbc: state.EventsByCategoryReducers.eventsbc
});

export default connect(mapStateToProps)(EventsByCategory);