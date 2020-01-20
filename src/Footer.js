import React, {Component} from 'react'; 
import {Container, Grid, Item, Divider, Menu, Header} from 'semantic-ui-react';




export default class Footer extends Component{
    render(){
        return (
          <div style={{ color: 'orange', background: 'rgba(0, 0, 0, 1)'}}>
            <Container style={{ marginTop: "30px" }}>
              <Grid>
                <Grid.Row columns="equal">
                  <Grid.Column>
                    <p style={{ fontSize: "21px" }}>About Dumb-Tick</p>
                    <Item.Group>
                      <Item>
                        <Item.Content>
                          Dumb-Tick is a web-based platform that provides
                          tickets for various events around sports, music,
                          science, and programming.
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </Grid.Column>
                  <Grid.Column>
                    <p style={{ fontSize: "21px" }}>Links</p>
                    <Item.Group>
                      <Item>
                        <Item.Content>
                          <a>About Us</a>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                    <p style={{ fontSize: "21px" }}>Follow Us On</p>
                    <Item.Group>
                      <Item>
                        <Item.Content>
                          <a>Explore</a>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </Grid.Column>
                  <Grid.Column>
                    <p style={{ fontSize: "21px" }}>Have A Questions ?</p>
                    <Item.Group>
                      <Item>
                        <Item.Content>
                          Dumb-Tick
                          <br />
                          Email: <a>support@dumbtick.com</a>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div>
        );
}
}
