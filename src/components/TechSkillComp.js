import React from 'react';
import {Row,Col,Collapse,Form,FormGroup,Input,Button,Card,CardBody,CardHeader} from 'reactstrap';
import firebase from '../config/firebase';
import Container from 'reactstrap/lib/Container';

class TechSkillComp extends React.Component{
  constructor(props){
    super(props);
    this.state={
      skills:[],
      openEditSkill:false,
      skill:'Skill'
    };
    this.handleEditSkill=this.handleEditSkill.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleUpdateSkill=this.handleUpdateSkill.bind(this);
  }
  componentDidMount(){
    firebase.database().ref('users/'+this.props.uid+'/skill').on('value',(snapshot)=>{
      var skills=[];
      snapshot.forEach(item=>{
        skills.push(item.val())
      })
      this.setState({skills:skills});
    })
  }
  handleEditSkill(){
    this.setState({openEditSkill:!this.state.openEditSkill});
  }

  handleChange(event){
    this.setState({[event.target.name]:event.target.value});
  }

  handleUpdateSkill(event){
    event.preventDefault();
    firebase.database().ref('users/'+this.props.uid+'/skill').push(this.state.skill);
    this.setState({skill:''});
  }

  render(){
    const renderSkill=this.state.skills.map((value)=>{
      return <li><h5><i className="fa fa-chevron-circle-right fa-md"></i><strong>&nbsp;{value}</strong></h5></li>
    })
    return(
      <Container id="trans">
        <Card>
          <CardHeader id="cardheader">
            <h2><strong><strong>Technical Skills</strong></strong></h2>
          </CardHeader>
          <CardBody id="cardbody">
            <Row>
              <Col className="col-sm-8 col-12">
              <Row>
                  <Col className="col-12 top">
                    <ul className="list-unstyled">
                      {renderSkill}
                    </ul>
                  </Col>
                  <Collapse isOpen={this.state.openEditSkill}>
                    <Form onSubmit={this.handleUpdateSkill}>
                      <FormGroup row>
                        <Col>
                          <Input onChange={this.handleChange} type="title" name="skill" value={this.state.skill} placeholder={this.state.skill}/><br/>
                          <Button color="info" outline type="submit" className="btn btn-sm"><i className="fa fa-check fa-lg"></i><strong>&nbsp;Save</strong></Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Collapse>   
                </Row>
              </Col>
              <Col className="col-sm-4 col-12">
                <Button outline color="info" className="btn btn-sm" onClick={this.handleEditSkill}><i className="fa fa-pencil fa-md"></i>Edit Technical Skills</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    )
  }
}

export default TechSkillComp;