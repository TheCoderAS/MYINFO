import React from 'react';
import {Row,Col,Collapse,Form,FormGroup,Input,Button,Card,CardBody,CardHeader} from 'reactstrap';
import firebase from '../config/firebase';
import Container from 'reactstrap/lib/Container';

class EducationComp extends React.Component{
  constructor(props){
    super(props);
    this.state={
      education:[],
      openEditEducation:false,
      inter:'',
      matric:'',
      current:'',
      roll:'',
      nad:'',
    };
    this.handleEditEducation=this.handleEditEducation.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleUpdateInter=this.handleUpdateInter.bind(this);
    this.handleUpdateMatric=this.handleUpdateMatric.bind(this);
    this.handleUpdateCurrent=this.handleUpdateCurrent.bind(this);
    this.handleUpdateRoll=this.handleUpdateRoll.bind(this);
    this.handleUpdateNad=this.handleUpdateNad.bind(this);

  }
  componentDidMount(){
    firebase.database().ref('/users/'+this.props.uid+'/education').on('value',(snapshot)=>{
      this.setState({education:snapshot.val()});
    })
  }
  handleEditEducation(){
    this.setState({openEditEducation:!this.state.openEditEducation});
  }

  handleChange(event){
    this.setState({[event.target.name]:event.target.value});
  }

  handleUpdateInter(event){
    event.preventDefault();
    firebase.database().ref('users/'+this.props.uid+'/education').update({Inter:this.state.inter});
    this.setState({inter:''});
  }
  handleUpdateMatric(event){
    event.preventDefault();
    firebase.database().ref('users/'+this.props.uid+'/education').update({Matric:this.state.matric});
    this.setState({matric:''});
  }
  handleUpdateCurrent(event){
    event.preventDefault();
    firebase.database().ref('users/'+this.props.uid+'/education').update({Current:this.state.current});
    this.setState({current:''});
  }
  handleUpdateRoll(event){
    event.preventDefault();
    firebase.database().ref('users/'+this.props.uid+'/education').update({Roll:this.state.roll});
    this.setState({roll:''});
  }
  handleUpdateNad(event){
    event.preventDefault();
    firebase.database().ref('users/'+this.props.uid+'/education').update({NAD:this.state.nad});
    this.setState({nad:''});
  }

  render(){
    return(
      <Container id="trans">
        <Card>
          <CardHeader id="cardheader">
            <h2><strong><strong>Education</strong></strong></h2>
          </CardHeader>
          <CardBody id="cardbody">
            <Row>
              <Col className="col-sm-8 col-12">
              <Row>
                  <Col className="col-12 top">
                    <h5><i className="fa fa-chevron-circle-right fa-md"></i><strong>&nbsp;Current Education: </strong>{this.state.education.Current}</h5>
                  </Col>
                  <Collapse isOpen={this.state.openEditEducation}>
                    <Form onSubmit={this.handleUpdateCurrent}>
                      <FormGroup row>
                        <Col>
                          <Input onChange={this.handleChange} type="textarea" name="current" value={this.state.current} placeholder={this.state.current}/><br/>
                          <Button color="info" outline type="submit" className="btn btn-sm"><i className="fa fa-check fa-lg"></i><strong>&nbsp;Save</strong></Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Collapse>   
                </Row>
                <Row>
                  <Col className="col-12 top">
                    <h5><i className="fa fa-chevron-circle-right fa-md"></i><strong>&nbsp;&nbsp;Roll No.: </strong>{this.state.education.Roll}</h5>
                  </Col>
                  <Collapse isOpen={this.state.openEditEducation}>
                    <Form onSubmit={this.handleUpdateRoll}>
                      <FormGroup row>
                        <Col>
                          <Input onChange={this.handleChange} type="text" name="roll" value={this.state.roll} placeholder={this.state.roll}/><br/>
                          <Button color="info" outline type="submit" className="btn btn-sm"><i className="fa fa-check fa-lg"></i><strong>&nbsp;Save</strong></Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Collapse>  
                </Row>
                <Row>
                  <Col className="col-12 top">
                    <h5><i className="fa fa-chevron-circle-right fa-md"></i><strong>&nbsp;NAD I'd: </strong>{this.state.education.NAD}</h5>
                  </Col>
                  <Collapse isOpen={this.state.openEditEducation}>
                    <Form onSubmit={this.handleUpdateNad}>
                      <FormGroup row>
                        <Col>
                          <Input onChange={this.handleChange} type="text" name="nad" value={this.state.nad} placeholder={this.state.nad}/><br/>
                          <Button color="info" outline type="submit" className="btn btn-sm"><i className="fa fa-check fa-lg"></i><strong>&nbsp;Save</strong></Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Collapse>  
                </Row>               
                <Row>
                  <Col className="col-12 top">
                    <h5><i className="fa fa-chevron-circle-right fa-md"></i><strong>&nbsp;&nbsp;(10+2)th: </strong>{this.state.education.Inter}</h5>
                  </Col>
                  <Collapse isOpen={this.state.openEditEducation}>
                    <Form onSubmit={this.handleUpdateInter}>
                      <FormGroup row>
                        <Col>
                          <Input onChange={this.handleChange} type="textarea" name="inter" value={this.state.inter} placeholder={this.state.inter}/><br/>
                          <Button color="info" outline type="submit" className="btn btn-sm"><i className="fa fa-check fa-lg"></i><strong>&nbsp;Save</strong></Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Collapse> 
                </Row> 
                <Row>
                  <Col className="col-12 top">
                    <h5><i className="fa fa-chevron-circle-right fa-md"></i><strong>&nbsp;&nbsp;&nbsp;10th: </strong>{this.state.education.Matric}</h5>
                  </Col>
                  <Collapse isOpen={this.state.openEditEducation}>
                    <Form onSubmit={this.handleUpdateMatric}>
                      <FormGroup row>
                        <Col>
                          <Input onChange={this.handleChange} type="textarea" name="matric" value={this.state.matric} placeholder={this.state.matric}/><br/>
                          <Button color="info" outline type="submit" className="btn btn-sm"><i className="fa fa-check fa-lg"></i><strong>&nbsp;Save</strong></Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Collapse>   
                </Row>
              </Col>
              <Col className="col-sm-4 col-12">
                <Button outline color="info" className="btn btn-sm" onClick={this.handleEditEducation}><i className="fa fa-pencil fa-md"></i>Edit Education</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    )
  }
}

export default EducationComp;