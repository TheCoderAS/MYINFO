import React,{Component} from 'react';
import {Nav,Navbar,NavbarBrand,Jumbotron,Row,Col,NavItem,Collapse,NavbarToggler,NavLink} from 'reactstrap';
import favicon from '../favicon.ico'

class HeaderComp extends Component{
  constructor(props){
    super(props);
    this.state={
      isNavOpen:false
    }
    this.toggleNav=this.toggleNav.bind(this);
  }
  toggleNav(){
    this.setState({isNavOpen:!this.state.isNavOpen});
  }
  render(){
    return(
      <div>
        <Navbar dark expand="md" color="dark" fixed="top">
          <div className="contain">
            <NavbarToggler onClick={this.toggleNav}/>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavbarBrand href="/">
                    <img src={favicon} height="30" width="30" alt='My Info' /><strong><strong>&nbsp;&nbsp;MY INFO&nbsp;&nbsp;</strong></strong>
                  </NavbarBrand>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link"  href="/"><span className="fa fa-home"></span>Dashboard</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        
        <Jumbotron id="jumbotron">
          <div className="contain">
            <Row>
              <Col sm={3} className="offset-1 text-center">
                <h2><strong><strong>MY INFO</strong></strong></h2>
              </Col>
              <Col sm={7} className="offset-1 text-center">
                <h6>Quickly design your Resume and share to clients securely</h6>
              </Col>
            </Row>
          </div>
        </Jumbotron>
        <div className="contain">
          <Row>
            <Col className="offset-1 text-center col-8">
            </Col>
            <Col className="col-1">
            </Col>
          </Row>
        </div>
      </div>
    );
  };
}

export default HeaderComp;