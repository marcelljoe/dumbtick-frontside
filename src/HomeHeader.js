  import _ from 'lodash';
import React, {Component, createRef} from 'react';
import {Divider, Dropdown, Container, Menu, Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import Profile from './Profile';
import AddEvent from './AddEvent';

export default class HomeHeader extends Component {
    state = {activateItem: 'none'}
    handleItemClick = (e, {name}) => this.setState({activeItem: name})


    onClickLogout = (e) => {
      localStorage.clear();
      window.location.href = "https://dumbtick-joe.netlify.com/";
    }

    render(){
        

        return (
          <div style={{backgroundColor: 'orange'}}>
            <Container>
              <Menu secondary>
                <Menu.Item>
                  <Link to="/">
                    <Header as="h1" style={{ fontFamily:"Arkhip", marginLeft: "0px" }}>
                      Dumb-Tick
                    </Header>
                  </Link>
                </Menu.Item>
                {localStorage.getItem("isLoggedIn") == 1 ? (
                  <Menu.Menu position="right">
                    <Menu.Item>
                      <Dropdown text={localStorage.getItem("name")}>
                        <Dropdown.Menu style={{background: 'rgba(255, 165, 0, 1)'}}> 
                          <Dropdown.Item as={Link} to={`/profile/${localStorage.getItem("id")}`}>Profile</Dropdown.Item>
                          <Dropdown.Item as={Link} to="/payment">Payment & My Tickets</Dropdown.Item>
                          <AddEvent/>
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
