import React, {Component} from 'react';
import {Container, Card, Input, Divider, Header, Icon} from 'semantic-ui-react';
import HomeHeader from './HomeHeader';
import Axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router-dom';
import EventsByCategory from './EventsByCategory';
import Cards from './Cards';
import Footer from './Footer';
import {getEventsByToday, getEventsUpcoming, getCategories, getEvents} from './Redux/_actions/HomeActions';
import {connect} from 'react-redux';



class Home extends Component {
    constructor(props){
        super(props);
        // this.state= {
        //     categories:[],
        //     events: [],
        //     eventsbt: [],
        //     eventsuc: []
        //     }
        }

    componentDidMount(){
                         //this commented text below is for getting data using axios without redux
      
                         // Axios.get("http://localhost:7000/dumbtick/categories")
                         // .then(res => {
                         //     const datac = res.data;
                         //     console.log(res.data);
                         //     this.setState({categories: datac});
                         // });

                         // Axios.get("http://localhost:7000/dumbtick/events")
                         // .then(res => {
                         //     const datae = res.data;
                         //                 console.log(res.data);
                         //     this.setState({events: datae})
                         // });

                         // Axios.get("http://localhost:7000/dumbtick/eventsbytoday")
                         // .then(res => {
                         //   const databt = res.data;
                         //               console.log(res.data);
                         //   this.setState({ eventsbt: databt });
                         // });

                         // Axios.get("http://localhost:7000/dumbtick/eventsupcoming")
                         // .then(res => {
                         //   const datauc = res.data;
                         //               console.log(res.data);
                         //   this.setState({ eventsuc: datauc });
                         // });
      this.props.dispatch(getEventsByToday());
      this.props.dispatch(getEventsUpcoming());
      this.props.dispatch(getEvents());
      this.props.dispatch(getCategories());
    }

    render(){
        // const {categories, eventsbt, eventsuc } =this.state;
        const extra = (
          <a>
            <Icon name="user" />
            16 Friends
          </a>
        );

        const currDate = moment().format("DD MMMM YYYY");
        console.log(currDate);

        return (
          <div>
            <HomeHeader />
            <Divider hidden />
            <Container>
              <Input fluid icon="search" placeholder="Search...." />
              <Header
                as="h1"
                content="Category"
                style={{ fontFamily: "Arkhip" }}
              />
              <Card.Group itemsPerRow={4}>
                {this.props.categories.map((dc, i) => (
                  <Card
                    color="orange"
                    link
                    style={{
                      backgroundImage:
                        "url(https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148250788.jpg)"
                    }}
                  >
                    <Card.Content as={Link} to={`/category/${dc.id}/events`}>
                      <Card.Header
                        textAlign="center"
                        style={{ fontFamily: "Arkhip" }}
                      >
                        {dc.name}
                      </Card.Header>
                    </Card.Content>
                  </Card>
                ))}
              </Card.Group>
              <Header
                as="h1"
                content="Today"
                style={{ fontFamily: "Arkhip" }}
              />
              <Card.Group itemsPerRow={3}>
                {this.props.eventsbt.map((de, i) => {
                  const checkDate = new Date(de.startTime);
                  const date = moment(checkDate).format("DD MMMM YYYY");
                  return (
                    <Cards
                      id={de.id}
                      img={de.img}
                      title={de.title}
                      price={`Rp${de.price}`}
                      description={de.description}
                      date={date}
                      category={de.category.name}
                      link={`/event/${de.id}/detail`}
                    />
                  );
                })}
              </Card.Group>
              <Header
                as="h1"
                content="Upcoming Event"
                style={{ fontFamily: "Arkhip" }}
              />
              <Card.Group itemsPerRow={3}>
                {this.props.eventsuc.map((de, i) => {
                  const checkDate = new Date(de.startTime);
                  const date = moment(checkDate).format("DD MMMM YYYY");
                  return (
                    <Cards
                      id={de.id}
                      img={de.img}
                      title={de.title}
                      price={`Rp${de.price}`}
                      description={de.description}
                      date={date}
                      link={`/event/${de.id}/detail`}
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


const mapStateToProps = state => ({
  categories: state.HomeReducers.categories,
  events: state.HomeReducers.events,
  eventsuc: state.HomeReducers.eventsuc,
  eventsbt: state.HomeReducers.eventsbt
});

export default connect(mapStateToProps)(Home);