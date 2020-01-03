  import _ from 'lodash';
import React, {Component, createRef} from 'react';
import {Segment, Rail, Ref, Sticky, Item, Divider, Dropdown, Trigger, Container, Menu, Form, Input, Grid, Image, Button, Header, Icon, Modal, SegmentInline} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Avatar from 'react-avatar';
import Login from './Login';
import Registration from './Registration';
import Profile from './Profile';
import AddEvent from './AddEvent';

export default class HomeHeader extends Component {
    state = {activateItem: 'none'}
    handleItemClick = (e, {name}) => this.setState({activeItem: name})


    onClickLogout = (e) => {
      localStorage.clear();
      window.location.reload();
    }

    render(){
        

        return (
          <div style={{ backgroundColor: "orange" }}>
            <Container>
              <Menu secondary>
                <Menu.Item>
                  <Link to="/">
                    <Header as="h1" style={{ fontFamily:"Arkhip", marginLeft: "0px" }}>
                      Dumb-Tick
                    </Header>
                  </Link>
                </Menu.Item>
                {localStorage.isLoggedIn == 1 ? (
                  <Menu.Menu position="right">
                    <Menu.Item>
                      <Dropdown text={localStorage.name}>
                        <Dropdown.Menu>
                          <Dropdown.Item as={Link} to={`/profile/${localStorage.id}`}>Profile</Dropdown.Item>
                          <Dropdown.Item as={Link} to="/payment">Payment & My Tickets</Dropdown.Item>
                          <AddEvent/>
                          {/* <Dropdown.Item>Add Event</Dropdown.Item> */}
                          <Divider/>
                          <Dropdown.Item onClick={this.onClickLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Menu.Item>
                  </Menu.Menu>
                ) : (
                  <Menu.Menu position="right">
                    <Menu.Item>
                      <Registration />
                    </Menu.Item>
                    <Menu.Item>
                      <Login />
                    </Menu.Item>
                  </Menu.Menu>
                )}
              </Menu>
            </Container>
          </div>
        ); 
    }
}
