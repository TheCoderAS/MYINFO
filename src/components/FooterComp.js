import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Button,Row,Col,Collapse,} from 'reactstrap';

class FooterComp extends Component{
  constructor(props){
    super(props);
    this.state={
      isContactOpen:false
    }
    this.toggleContact=this.toggleContact.bind(this);
  }

  toggleContact(){
    this.setState({isContactOpen:!this.state.isContactOpen});
  }

  render(){
    return(
      <div>
      <Row className="contact">
          <Col>
            <Button outline color="info" onClick={this.toggleContact}><strong>Contact Us</strong></Button>
          </Col>
        </Row>
        <Collapse isOpen={this.state.isContactOpen}>
          <Row className="contact">
            <Col className="col-sm-6 col-12">
              <a href="mailto:aaloksah766626@gmail.com"><i className="fa fa-envelope"></i><strong>&nbsp;Email: aaloksah766626@gmail.com</strong></a>
            </Col>
            <Col className="col-sm-6 col-12">
              <a href="tel:+919504496801"><i className="fa fa-phone"></i><strong>&nbsp;Phone: +91 95044 96801</strong></a>
            </Col>
          </Row>
        </Collapse>
      <div id="footer">
        <div className="row justify-content-center copyright">
          <div className="col-auto">
            <Link to="/privacy"><Button outline color="info">Privacy & Policy</Button></Link>
          </div>
          <div className="col-auto">
            <Link to="/"><Button outline color="info">Home page</Button></Link>
          </div>
          </div>
        <div className="row justify-content-center copyright">             
          <div className="col-auto">
            <p><strong><strong>©</strong> Copyright 2020 MyInfo@AalokKumar</strong></p>
          </div>
        </div>
      </div>
      </div>
    );
  };
}
export default FooterComp;