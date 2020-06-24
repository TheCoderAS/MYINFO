import React from 'react';
import {Row,Col,Collapse,Form,FormGroup,Input,Button,Card,CardBody,CardHeader} from 'reactstrap';
import firebase from '../config/firebase';
import Container from 'reactstrap/lib/Container';

class EducationComp extends React.Component{
  constructor(props){
    super(props);
    this.state={
      projectlist:[],
      openEditProject:false,
      project:'Description',
      title:'Title'
    };
    this.handleEditProject=this.handleEditProject.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleUpdateProject=this.handleUpdateProject.bind(this);
  }
  componentDidMount(){
    firebase.database().ref('users/'+this.props.uid+'/project').on('value',(snapshot)=>{
      var snap=[];
      snapshot.forEach(item=>{
        snap.push(item.val());
      })
      this.setState({projectlist:snap});
    })
  }
  handleEditProject(){
    this.setState({openEditProject:!this.state.openEditProject});
  }

  handleChange(event){
    this.setState({[event.target.name]:event.target.value});
  }

  handleUpdateProject(event){
    var projobj={
      Description:this.state.project,
      Title:this.state.title
    };
    event.preventDefault();
    firebase.database().ref('users/'+this.props.uid+'/project').push(projobj);
    this.setState({project:'Description',title:'Title'})
  }

  render(){
    const renderProject=this.state.projectlist.map((value,index)=>{
      return <li key={index}><h5><i className="fa fa-chevron-circle-right fa-md"></i>&nbsp;<strong>{value.Title}</strong> : {value.Description}</h5></li>
    });
    return(
      <Container id="trans">
        <Card>
          <CardHeader id="cardheader">
            <h2><strong><strong>Projects</strong></strong></h2>
          </CardHeader>
          <CardBody id="cardbody">
            <Row>
              <Col className="col-sm-8 col-12">
              <Row>
                  <Col className="col-12 top">
                    <ul className="list-unstyled">
                      {renderProject}
                    </ul>
                  </Col>
                  <Collapse isOpen={this.state.openEditProject}>
                    <Form onSubmit={this.handleUpdateProject}>
                      <FormGroup row>
                        <Col className="col-sm-3 col-12">
                          <Input onChange={this.handleChange} type="title" name="title" value={this.state.title} placeholder={this.state.title}/>
                        </Col><br/>
                        <Col className="col-sm-6 col-12">
                          <Input onChange={this.handleChange} type="textarea" name="project" value={this.state.project} placeholder={this.state.project}/>
                        </Col><br/>
                        <Col className="col-sm-3 col-12">
                          <Button color="info" outline type="submit" className="btn btn-sm"><i className="fa fa-check fa-lg"></i><strong>&nbsp;Save</strong></Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Collapse>   
                </Row>
              </Col>
              <Col className="col-sm-4 col-12">
                <Button outline color="info" className="btn btn-sm" onClick={this.handleEditProject}><i className="fa fa-pencil fa-md"></i>Edit Projects</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    )
  }
}

export default EducationComp;