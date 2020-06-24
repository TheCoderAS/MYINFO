import React from 'react';
import {Row,Col,Collapse,Form,FormGroup,Input,Button,Card,CardBody,CardHeader} from 'reactstrap';
import firebase from '../config/firebase';
import Container from 'reactstrap/lib/Container';

class OtherComp extends React.Component{
  constructor(props){
    super(props);
    this.state={
      interest:[],
      openEditCert:false,
      openEditInt:false,
      cert:'',
      int:''
    };
    this.handleEditCert=this.handleEditCert.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleUpdateCert=this.handleUpdateCert.bind(this);
    this.handleEditInt=this.handleEditInt.bind(this);
    this.handleUpdateInt=this.handleUpdateInt.bind(this);

  }
  componentDidMount(){
    firebase.database().ref('users/'+this.props.uid+'/interest').on('value',(snapshot)=>{
      var snap=[];
      snapshot.forEach(item=>{
        snap.push(item.val());
      })
      this.setState({interest:snap});
    })
  }
  handleEditCert(){
    alert('Adding certificate is not supported yet!\nSorry for inconvenience!');
    //this.setState({openEditCert:!this.state.openEditCert});
  }
  handleEditInt(){
    this.setState({openEditInt:!this.state.openEditInt});
  }

  handleChange(event){
    this.setState({[event.target.name]:event.target.value});
  }

  handleUpdateCert(event){
    event.preventDefault();
    console.log(this.state.cert);
  }
  handleUpdateInt(event){
    event.preventDefault();
    firebase.database().ref('users/'+this.props.uid+'/interest').push(this.state.int);
    this.setState({int:''});
  }

  render(){
    const renderInterest=this.state.interest.map(value=>{
      return <li><h5><i className="fa fa-chevron-circle-right fa-md"></i><strong>&nbsp;{value}</strong></h5></li>
    })
    return(
      <Container id="trans">
        <Card id="othercard">
          <CardHeader id="cardheader">
            <h2><strong><strong>Certificates</strong></strong></h2>
          </CardHeader>
          <CardBody id="cardbody">
            <Row>
              <Col className="col-sm-8 col-12">
              <Row>
                  <Col className="col-12 top text-center">
                    <h5>Updating Soon...</h5>
                  </Col>
                  <Collapse isOpen={this.state.openEditCert}>
                    <Form onSubmit={this.handleUpdateCert}>
                      <FormGroup row>
                        <Col>
                          <Input onChange={this.handleChange} type="title" name="cert" value={this.state.cert} placeholder={this.state.cert}/><br/>
                          <Button color="info" outline type="submit" className="btn btn-sm"><i className="fa fa-check fa-lg"></i><strong>&nbsp;Save</strong></Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Collapse>   
                </Row>
              </Col>
              <Col className="col-sm-4 col-12">
                <Button outline color="info" className="btn btn-sm" onClick={this.handleEditCert}><i className="fa fa-pencil fa-md"></i>Edit Certificates</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card id="othercard">
          <CardHeader id="cardheader">
            <h2><strong><strong>Interests</strong></strong></h2>
          </CardHeader>
          <CardBody id="cardbody">
            <Row>
              <Col className="col-sm-8 col-12">
                <Row>
                  <Col className="col-12 top">
                    <ul className="list-unstyled">
                      {renderInterest}
                    </ul>
                  </Col>
                  <Collapse isOpen={this.state.openEditInt}>
                    <Form onSubmit={this.handleUpdateInt}>
                      <FormGroup row>
                        <Col>
                          <Input onChange={this.handleChange} type="title" name="int" value={this.state.int} placeholder={this.state.int}/><br/>
                          <Button color="info" outline type="submit" className="btn btn-sm"><i className="fa fa-check fa-lg"></i><strong>&nbsp;Save</strong></Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Collapse>   
                </Row>
              </Col>
              <Col className="col-sm-4 col-12">
                <Button outline color="info" className="btn btn-sm" onClick={this.handleEditInt}><i className="fa fa-pencil fa-md"></i>Edit Interests</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    )
  }
}

export default OtherComp;