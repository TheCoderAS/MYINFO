import React from 'react';
import {Row,Col,Collapse,Form,FormGroup,Input,Button,Card,CardBody,CardHeader} from 'reactstrap';
import firebase from '../config/firebase';
import Container from 'reactstrap/lib/Container';

class ProfileComp extends React.Component{
  constructor(props){
    super(props);
    this.state={
      openEditProfile:false,
      profile:[],
      name:'Your Name',
      email:'',
      phone:'',
      college:'',
      dob:'',
      address:''
    };
    this.handleEditProfile=this.handleEditProfile.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleUpdateName=this.handleUpdateName.bind(this);
    this.handleUpdateEmail=this.handleUpdateEmail.bind(this);
    this.handleUpdatePhone=this.handleUpdatePhone.bind(this);
    this.handleUpdateCollege=this.handleUpdateCollege.bind(this);
    this.handleUpdateDob=this.handleUpdateDob.bind(this);
    this.handleUpdateAddress=this.handleUpdateAddress.bind(this);

  }
  componentDidMount(){
    firebase.database().ref('/users/'+this.props.uid+'/profile').on('value',(snapshot)=>{
      this.setState({profile:snapshot.val()});
    })
  }
  handleEditProfile(){
    this.setState({openEditProfile:!this.state.openEditProfile});
  }

  handleChange(event){
    this.setState({[event.target.name]:event.target.value});
  }

  handleUpdateName(event){
    event.preventDefault();
    firebase.database().ref('users/'+this.props.uid+'/profile').update({Name:this.state.name});
    this.setState({name:''});
  }
  handleUpdateEmail(event){
    event.preventDefault();
    firebase.database().ref('users/'+this.props.uid+'/profile').update({Email:this.state.email});
    this.setState({email:''});
  }
  handleUpdatePhone(event){
    event.preventDefault();
    firebase.database().ref('users/'+this.props.uid+'/profile').update({Phone:this.state.phone});
    this.setState({phone:''});
  }
  handleUpdateCollege(event){
    event.preventDefault();
    firebase.database().ref('users/'+this.props.uid+'/profile').update({College:this.state.college});
    this.setState({college:''});
  }
  handleUpdateDob(event){
    event.preventDefault();
    firebase.database().ref('users/'+this.props.uid+'/profile').update({DOB:this.state.dob});
    this.setState({dob:''});
  }
  handleUpdateAddress(event){
    event.preventDefault();
    firebase.database().ref('users/'+this.props.uid+'/profile').update({Address:this.state.address});
    this.setState({address:''});
  }

  render(){
    return(
      <Container id="trans">
        <Card>
          <CardHeader id="cardheader">
            <h2><strong><strong>{this.state.profile.Name}</strong></strong></h2>
          </CardHeader>
          <CardBody id="cardbody">
            <Row>
              <Col className="col-sm-8 col-12">
                <Row>
                <Collapse isOpen={this.state.openEditProfile}>
                    <Form onSubmit={this.handleUpdateName}>
                      <FormGroup row>
                        <Col>
                          <Input onChange={this.handleChange} type="name" name="name" value={this.state.name} placeholder={this.state.name}/><br/>
                          <Button color="info" outline type="submit" className="btn btn-sm"><i className="fa fa-check fa-lg"></i><strong>&nbsp;Save</strong></Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Collapse> 
                  <Col className="col-12 top">
                    <h5><i className="fa fa-envelope fa-md"></i><strong>&nbsp;&nbsp;Email: </strong>{this.state.profile.Email}</h5>
                  </Col>
                  <Collapse isOpen={this.state.openEditProfile}>
                    <Form onSubmit={this.handleUpdateEmail}>
                      <FormGroup row>
                        <Col>
                          <Input onChange={this.handleChange} type="email" name="email" value={this.state.email} placeholder={this.state.email}/><br/>
                          <Button color="info" outline type="submit" className="btn btn-sm"><i className="fa fa-check fa-lg"></i><strong>&nbsp;Save</strong></Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Collapse> 
                </Row> 
                <Row>
                  <Col className="col-12 top">
                    <h5><i className="fa fa-phone fa-md"></i><strong>&nbsp;&nbsp;&nbsp;Phone: </strong>{this.state.profile.Phone}</h5>
                  </Col>
                  <Collapse isOpen={this.state.openEditProfile}>
                    <Form onSubmit={this.handleUpdatePhone}>
                      <FormGroup row>
                        <Col>
                          <Input onChange={this.handleChange} type="tel" name="phone" value={this.state.phone} placeholder={this.state.phone}/><br/>
                          <Button color="info" outline type="submit" className="btn btn-sm"><i className="fa fa-check fa-lg"></i><strong>&nbsp;Save</strong></Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Collapse>   
                </Row>
                <Row>
                  <Col className="col-12 top">
                    <h5><i className="fa fa-graduation-cap fa-md"></i><strong>&nbsp;College: </strong>{this.state.profile.College}</h5>
                  </Col>
                  <Collapse isOpen={this.state.openEditProfile}>
                    <Form onSubmit={this.handleUpdateCollege}>
                      <FormGroup row>
                        <Col>
                          <Input onChange={this.handleChange} type="college" name="college" value={this.state.college} placeholder={this.state.college}/><br/>
                          <Button color="info" outline type="submit" className="btn btn-sm"><i className="fa fa-check fa-lg"></i><strong>&nbsp;Save</strong></Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Collapse>   
                </Row>
                <Row>
                  <Col className="col-12 top">
                    <h5><i className="fa fa-calendar fa-md"></i><strong>&nbsp;&nbsp;D.O.B.: </strong>{this.state.profile.DOB}</h5>
                  </Col>
                  <Collapse isOpen={this.state.openEditProfile}>
                    <Form onSubmit={this.handleUpdateDob}>
                      <FormGroup row>
                        <Col>
                          <Input onChange={this.handleChange} type="date" name="dob" value={this.state.dob} placeholder={this.state.dob}/><br/>
                          <Button color="info" outline type="submit" className="btn btn-sm"><i className="fa fa-check fa-lg"></i><strong>&nbsp;Save</strong></Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Collapse>  
                </Row>
                <Row>
                  <Col className="col-12 top">
                    <h5><i className="fa fa-vcard fa-md"></i><strong>&nbsp;Address: </strong>{this.state.profile.Address}</h5>
                  </Col>
                  <Collapse isOpen={this.state.openEditProfile}>
                    <Form onSubmit={this.handleUpdateAddress}>
                      <FormGroup row>
                        <Col>
                          <Input onChange={this.handleChange} type="textarea" name="address" value={this.state.address} placeholder={this.state.address}/><br/>
                          <Button color="info" outline type="submit" className="btn btn-sm"><i className="fa fa-check fa-lg"></i><strong>&nbsp;Save</strong></Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Collapse>  
                </Row>               
              </Col>
              <Col className="col-sm-4 col-12">
                <Button outline color="info" className="btn btn-sm" onClick={this.handleEditProfile}><i className="fa fa-pencil fa-md"></i>Edit Profile</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    )
  }
}

export default ProfileComp;