import React from 'react';
import firebase from '../config/firebase';
import {Row,Col,Button} from 'reactstrap';

class LogoutComp extends React.Component{
  handleLogout(){
    firebase.auth().signOut();
  }
  render(){
    return(
      <React.Fragment>
        <Row className="text-center logheader">
          <Col className="col-sm-10 col-12">
            <h3><strong>Welcome</strong></h3>
          </Col>
          <Col className="col-sm-2 col-12">
            <Button onClick={this.handleLogout} className="btn btn-md btn-success"><strong>LogOut</strong></Button>&nbsp;&nbsp;
          </Col>
        </Row>
        <Row>
          
        </Row>
      </React.Fragment>
    );
  }
}

export default LogoutComp;