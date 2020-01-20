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
  constructor(props) {
    super(props);
    this.state = {
      search: ""
      //     categories:[],
      //     events: [],
      //     eventsbt: [],
      //     eventsuc: []
    };
  }

  componentDidMount() {
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
    console.log(this.props.categories);
  }

  onChangeSearch = event => {
    this.setState({ search: event.target.value });
  };

  render() {
    // const {categories, eventsbt, eventsuc } =this.state;
    const extra = (
      <a>
        <Icon name="user" />
        16 Friends
      </a>
    );

    const currDate = moment().format("DD MMMM YYYY");
    console.log(currDate);

    const containerStyle = {
      background: 'rgba(255, 165, 0, 0.5)',
      padding: "15px",
      borderRadius: "25px"
    };

    const { search } = this.state;

    const filteredEventsToday = this.props.eventsbt.filter(eventsbt => {
      return eventsbt.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    const filteredEventsUpcoming = this.props.eventsuc.filter(eventsuc => {
      return eventsuc.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    return (
      <div style={{ backgroundColor: `rgba(180, 180, 180, 1)` }}>
        <HomeHeader />
        <Divider hidden />
        <Container>
          <Container>
            <Input
              fluid
              icon="search"
              placeholder="Search...."
              onChange={this.onChangeSearch}
            />
          </Container>
          <Divider />
          <Container>
            <Header
              as="h1"
              content="Category"
              style={{ fontFamily: "Arkhip" }}
            />
            <Card.Group itemsPerRow={4}>
              {this.props.categories.map((dc, i) => (
                <Card
                  link
                  color="orange"
                  style={{
                    backgroundImage: `url(${dc.img})`
                  }}
                >
                  <Card.Content as={Link} to={`/category/${dc.id}/events`}>
                    <Card.Header
                      textAlign="center"
                      style={{ fontFamily: "Arkhip", color: "white" }}
                    >
                      {dc.name}
                    </Card.Header>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          </Container>
          <Divider />
          <Divider hidden />

          {search ? (
            <Container>
              <Container>
                <Header
                  as="h1"
                  content="Today"
                  style={{ fontFamily: "Arkhip" }}
                />
                <Card.Group itemsPerRow={3}>
                  {filteredEventsToday.map((de, i) => {
                    const checkDate = new Date(de.startTime);
                    const date = moment(checkDate).format("DD MMMM YYYY");
                    return (
                      <Cards
                        id={de.id}
                        img={de.img}
                        title={de.title}
                        price={`Rp ${de.price}`}
                        description={de.description}
                        date={date}
                        category={de.category.name}
                        link={`/event/${de.id}/detail`}
                      />
                    );
                  })}
                </Card.Group>
              </Container>
              <Divider style={{ height: "2px" }} />
              <Container>
                <Header
                  as="h1"
                  content="Upcoming Event"
                  style={{ fontFamily: "Arkhip" }}
                />
                <Card.Group itemsPerRow={3}>
                  {filteredEventsUpcoming.map((de, i) => {
                    const checkDate = new Date(de.startTime);
                    const date = moment(checkDate).format("DD MMMM YYYY");
                    return (
                      <Cards
                        id={de.id}
                        img={de.img}
                        title={de.title}
                        price={`Rp ${de.price}`}
                        description={de.description}
                        date={date}
                        link={`/event/${de.id}/detail`}
                      />
                    );
                  })}
                </Card.Group>
              </Container>
            </Container>
          ) : (
            <Container>
              <Container>
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
                        price={`Rp ${de.price}`}
                        description={de.description}
                        date={date}
                        category={de.category.name}
                        link={`/event/${de.id}/detail`}
                      />
                    );
                  })}
                </Card.Group>
              </Container>
              <Divider style={{ height: "2px" }} />
              <Container>
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
                        price={`Rp ${de.price}`}
                        description={de.description}
                        date={date}
                        link={`/event/${de.id}/detail`}
                      />
                    );
                  })}
                </Card.Group>
              </Container>
            </Container>
          )}
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