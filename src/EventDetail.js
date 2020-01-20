import React, {Component} from 'react';
import { Container, Card, Divider, Image, Grid, Button, Header } from 'semantic-ui-react';
import Axios from 'axios';
import HomeHeader from './HomeHeader';
import Footer from './Footer';
import moment from 'moment';
import {Link} from 'react-router-dom';
import ReactHtmlParser, {
processNodes,
convertNodeToElement,
htmlparser2
} from "react-html-parser";
import {getEventDetail} from './Redux/_actions/EventDetailActions';
import {connect} from 'react-redux';



class EventDetail extends Component {
            state = {
              // eventDet: [],
              // categorySector: [],
              // userSector: [],
              quantity: 1,
              totalprice: 0,
              show: true,
              price: 0,


            };
            componentDidMount() {
              const { id } = this.props.match.params;
              // Axios.get(
              //   `http://localhost:7000/dumbtick/event/${id}/detail`
              // ).then(res => {
              //   console.log(res.data);
              //   this.setState({ 
              //     eventDet: res.data,
              //     categorySector: res.data.category,
              //     userSector: res.data.user
              //   });
              // });

              this.props.dispatch(getEventDetail(id));
            }


            onClickBuy = (e) => {
              if (localStorage.isLoggedIn != 1) {
                alert("You have to Log In first!!!");
              } else {
                const buyer_id = localStorage.id;
                const event_id = this.props.eventDet.id;
                const price = this.props.eventDet.price;
                const status = "Booked";
                const quantity = this.state.quantity;
                const totalPrice = price * quantity;
                console.log(totalPrice);
                Axios.post("https://dumbtick-backend.herokuapp.com/dumbtick/buy", {
                  buyer_id,
                  event_id,
                  status,
                  quantity,
                  totalPrice
                })
                .then(res => {
                  alert("Ticket successfully booked. Please go to the Payment Section on your Profile Menu.");
                  //window.location.href="https://dumbtick-joe.netlify.com/payment"
                })
                ;
            }
          }





            incrementItem = () => {
              this.setState({ quantity: this.state.quantity + 1 });
            };

            decrementItem = () => {
              if (this.state.quantity == 1) {
              } else {
                this.setState({ quantity: this.state.quantity - 1 });
              } 
            };


            render() {
              // const { eventDet, categorySector, userSector } = this.state;
              const dateSS = new Date(this.props.eventDet.startTime);
              const dateES = new Date(this.props.eventDet.endTime);
              const dateS = moment(dateSS).format("DD MMMM YYYY");
              const dateE = moment(dateES).format("DD MMMM YYYY");
              const timeS = moment(dateSS).format("hh:mm");
              const timeE = moment(dateES).format("hh:mm");



              return (
                <div style={{ backgroundColor: `rgba(180, 180, 180, 1)` }}>
                  <HomeHeader />
                  <Divider hidden />
                  <Container>
                    <Card.Group itemsPerRow={1}>
                      <Card style={{ background: "rgba(50, 50, 50, 1)" }}>
                        <Image
                          src={this.props.eventDet.img}
                          wrapped
                          ui={false}
                        />
                        <Card.Content>
                          <Card.Header
                            as="h1"
                            style={{
                              fontSize: "38px",
                              fontFamily: "Arkhip",
                              color: "orange"
                            }}
                          >
                            <Grid>
                              <Grid.Row columns="equal">
                                <Grid.Column>
                                  {this.props.eventDet.title}
                                </Grid.Column>
                                <Grid.Column
                                  width={5}
                                  textAlign="right"
                                  style={{
                                    fontSize: "30px",
                                    color: "orange"
                                  }}
                                >
                                  {`Rp${this.props.eventDet.price}`}
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Card.Header>

                          <Card.Header as="h1" style={{ color: "orange" }}>
                            <Grid>
                              <Grid.Row
                                columns="equal"
                                style={{
                                  marginTop: "0px",
                                  paddingTop: "0px"
                                }}
                              >
                                <Grid.Column>
                                  {this.props.categorySector.name}
                                </Grid.Column>
                                <Grid.Column
                                  textAlign="right"
                                  style={{ fontSize: "22px" }}
                                >
                                  <Button
                                    size="small"
                                    basic
                                    color="orange"
                                    style={{
                                      paddingBottom: "7px",
                                      paddingTop: "7px",
                                      paddingLeft: "11px",
                                      paddingRight: "11px",
                                      verticalAlign: "text-bottom",
                                      marginRight: "3px"
                                    }}
                                    content="-"
                                    onClick={this.decrementItem}
                                  />
                                  {this.state.quantity}
                                  <Button
                                    size="small"
                                    basic
                                    color="orange"
                                    style={{
                                      marginLeft: "3px",
                                      paddingBottom: "7px",
                                      paddingTop: "7px",
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                      verticalAlign: "text-bottom"
                                    }}
                                    content="+"
                                    onClick={this.incrementItem}
                                  />
                                  <Button
                                    size="small"
                                    color="orange"
                                    style={{
                                      paddingBottom: "7px",
                                      paddingTop: "7px",
                                      verticalAlign: "text-bottom"
                                    }}
                                    // as={Link}
                                    // to="/payment"
                                    onClick={this.onClickBuy}
                                  >
                                    BUY
                                  </Button>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                            <Grid.Row
                              columns={2}
                              style={{ paddingTop: "0px" }}
                            ></Grid.Row>
                          </Card.Header>
                        </Card.Content>
                        <Divider
                          style={{ backgroundColor: "orange", height: "1px" }}
                        />
                        <Card.Content>
                          <Grid>
                            <Grid.Row columns="equal">
                              <Grid.Column>
                                <Header style={{ color: "orange" }}>
                                  Hosted By
                                </Header>
                                <p style={{ color: "orange" }}>
                                  {this.props.userSector.name}
                                </p>
                              </Grid.Column>
                              <Grid.Column verticalAlign="top">
                                <Header style={{ color: "orange" }}>
                                  Date & Time
                                </Header>
                                <p style={{ color: "orange" }}>
                                  {dateS} - {dateE}
                                </p>
                                <p style={{ color: "orange" }}>
                                  {timeS} - {timeE} WIB
                                </p>
                              </Grid.Column>
                              <Grid.Column>
                                <Header style={{ color: "orange" }}>
                                  Contact Person
                                </Header>
                                <p style={{ color: "orange" }}>
                                  {this.props.userSector.name}
                                </p>
                                <p style={{ color: "orange" }}>
                                  {this.props.userSector.phoneNumber}
                                </p>
                                <p style={{ color: "orange" }}>
                                  {this.props.userSector.email}
                                </p>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Card.Content>
                        {/* <Card.Content>
                          <Card.Description>
                            {eventDet.description}
                          </Card.Description>
                        </Card.Content> */}
                      </Card>
                    </Card.Group>
                    <Grid>
                      <Grid.Row
                        columns={2}
                        stretched
                        textAlign="justified"
                        verticalAlign="top"
                      >
                        <Grid.Column>
                          <Header
                            textAlign="center"
                          >
                            Event Description
                          </Header>
                          <p>
                            {this.props.eventDet.description}
                          </p>
                        </Grid.Column>
                        <Grid.Column>
                          <Header
                            textAlign="center"
                            >
                            Location
                          </Header>
                          <div style={{ alignSelf: "center" }}>
                            {ReactHtmlParser(this.props.eventDet.urlMaps)}
                          </div>
                          {/* <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7931.828278429471!2d106.72135417850288!3d-6.2750194514481255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fa6255555555%3A0x83f994af5841af4f!2sCinema%20XXI%20Lotte%20Mall!5e0!3m2!1sen!2sid!4v1577791185118!5m2!1sen!2sid"
                            width="400"
                            height="300"
                            frameborder="0"
                            style={{alignSelf: "center"}}
                          ></iframe> */}
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Container>
                  <Footer />
                </div>
              );
            }
          }

          const mapStateToProps = state => ({
            eventDet: state.EventDetailReducers.eventDet,
            categorySector: state.EventDetailReducers.categorySector,
            userSector: state.EventDetailReducers.userSector
          });

          export default connect(mapStateToProps)(EventDetail);
