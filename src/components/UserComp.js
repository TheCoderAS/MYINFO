import React from 'react';
import {Row,Col,Button,Container,Modal,ModalBody,ModalHeader,ModalFooter,Spinner} from 'reactstrap';
import firebase from '../config/firebase';
import {Control,LocalForm,Errors} from 'react-redux-form';

const required = val => val && val.length;
const minLength = len => val => val && val.length >= len;

const initialProfile={
  Name:'',
  Email:'',
  Phone:'',
  College:'',
  DOB:'',
  Address:''
};
const initialEducation={
  Current:'',
  Roll:'',
  NAD:'',
  Inter:'',
  Matric:''
}

class UserComp extends React.Component{
  //constructor begins
  constructor(props){
    super(props);
    this.state={
      isLoginModalOpen:false,
      isRegisterModalOpen:false,
      anyerrlogin:false,
      errmsglogin:'',
      anyerrsign:false,
      errmsgsign:'',
      isWaiting:false
    };
    this.handleLogin=this.handleLogin.bind(this);
    this.handleSignUp=this.handleSignUp.bind(this);
    this.toggleLoginModal=this.toggleLoginModal.bind(this);
    this.toggleRegisterModal=this.toggleRegisterModal.bind(this);
  }


//handle Events like Login or Sign Up and user Input.

  handleLogin(event){
    this.setState({isWaiting:!this.state.isWaiting});
    setTimeout(()=>{this.setState({isWaiting:!this.state.isWaiting});},1000);
    firebase.auth().signInWithEmailAndPassword(event.email,event.password)
    .then((user)=>{
      console.log('Login Successful!');
    })
    .catch((err)=>{
      console.log('Login Unsuccessful!');
      this.setState({anyerrlogin:!this.state.anyerrlogin,errmsglogin:err.message});
      setTimeout(()=>{
        this.setState({anyerrlogin:!this.state.anyerrlogin});
      },2000);

    })
  }
  handleSignUp(event){
    this.setState({isWaiting:!this.state.isWaiting});
    setTimeout(()=>{this.setState({isWaiting:!this.state.isWaiting});},1000);
    firebase.auth().createUserWithEmailAndPassword(event.email,event.password)
    .then((user)=>{
      firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/profile').set(initialProfile);
      firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/education').set(initialEducation);
      console.log('SignUp Successful!');
    })
    .catch((err)=>{
      console.log('SignUp Unsuccessful!');
      this.setState({anyerrsign:!this.state.anyerrsign,errmsgsign:err.message});
      setTimeout(()=>{
        this.setState({anyerrsign:!this.state.anyerrsign});
      },2000);
    })
  }


  //toggle Modals


  toggleLoginModal(){
    this.setState({isLoginModalOpen:!this.state.isLoginModalOpen});
  }
  toggleRegisterModal(){
    this.setState({isRegisterModalOpen:!this.state.isRegisterModalOpen});
  }

  //render function.
  render(){
    return(
      <React.Fragment>
        <Row className="text-center logheader">
          <Col className="col-sm-10 col-12">
            <strong>Introduce yourself to the clients and people aspiring for tech-solutions.</strong>
          </Col>
          <Col className="col-sm-2 col-12">
            <Button onClick={this.toggleLoginModal} className="btn btn-md btn-success"><strong>Login</strong></Button>&nbsp;&nbsp;
            <Button onClick={this.toggleRegisterModal} className="btn btn-md btn-warning"><strong>Register</strong></Button>
          </Col>
        </Row>
        <Row className="docs">
          <Col>
            <p>The website has features to add and access your portfolio in interactive way. Also, you will be able to customize and download your Resume.</p>
            <p>And the website will display the technologies, projects, and other information that you have learnt and you can work on.</p>
            <p>The website will display all the required information that a resume has in general.</p>
            <h3><strong>Most relevant features are:</strong></h3>
            <ul className="list-unstyled">
              <li className="list">List of technologies you can work on.</li>
              <li className="list">Resume download.</li>
              <li className="list">Display projects that you have worked on.</li>
              <li className="list">Social media links for the clients to communicate.</li>
              <li className="list">Personal contact details for work.</li>
            </ul>
          </Col>
        </Row>
          <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal} id="modal">
            <ModalHeader className="modal-header" toggle={this.toggleLoginModal}>
                Login
            </ModalHeader>
            <ModalBody className="modal-body modal-lg">
              <Container>
              <LocalForm onSubmit={this.handleLogin}>
                <Row className="form-group">
                  <Col className="col-sm-6 col-12">
                    <Control.text
                      model=".email"
                      id="email"
                      name="email"
                      placeholder="Email/Username"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(5),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".email"
                      show="touched"
                      messages={{
                        required: "Required ",
                        minLength: "Invalid! Must be atleast five characters!",
                      }}
                    />
                  </Col>
                  <Col className="col-sm-6 col-12">
                    <Control.password
                      model=".password"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(6),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".password"
                      show="touched"
                      messages={{
                        required: "Required ",
                        minLength: "Weak Password",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="col-sm-6 col-12"></Col>
                  <Col className="col-sm-6 col-12">
                    <Button outline color="danger" onClick={this.toggleLoginModal}className="btn btn-sm">Cancel</Button>  &nbsp;  &nbsp;
                    <Button outline type="submit" value="submit" color="success" className="btn btn-sm">Login</Button>
                  </Col>
                </Row>
              </LocalForm>
              </Container>
            </ModalBody>
            <ModalFooter className="modal-footer">
              <small><strong>Note : &nbsp;</strong> Please enter correct details!</small>
            </ModalFooter>
            <Modal isOpen={this.state.anyerrlogin} id="modalwait">
              <ModalBody id="modalwaitbody">
                {this.state.errmsglogin}
              </ModalBody>
            </Modal>
            <Modal isOpen={this.state.isWaiting} id="modalwait">
              <ModalBody id="modalwaitbody">
                <Spinner style={{width:'2rem',height:'2rem',}} />
                <p><strong>Authenticating...</strong></p>
              </ModalBody>
            </Modal>
          </Modal>

          <Modal isOpen={this.state.isRegisterModalOpen} toggle={this.toggleRegisterModal} id="modal">
            <ModalHeader className="modal-header" toggle={this.toggleRegisterModal}>
                Register
            </ModalHeader>
            <ModalBody className="modal-body modal-lg">
              <Container>
                <LocalForm onSubmit={this.handleSignUp}>
                  <Row className="form-group">
                    <Col className="col-sm-6 col-12">
                      <Control.text
                        model=".email"
                        id="email"
                        name="email"
                        placeholder="Email/Username"
                        className="form-control"
                        validators={{
                          required,
                          minLength: minLength(5),
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".roll"
                        show="touched"
                        messages={{
                          required: "Required ",
                          minLength: "Invalid! Must be atleast five characters!",
                        }}
                      />
                    </Col>
                    <Col className="col-sm-6 col-12">
                      <Control.password
                        model=".password"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        className="form-control"
                        validators={{
                          required,
                          minLength: minLength(6),
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".password"
                        show="touched"
                        messages={{
                          required: "Required ",
                          minLength: "Weak Password",
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-sm-6 col-12"></Col>
                    <Col className="col-sm-6 col-12">
                      <Button outline color="danger" onClick={this.toggleRegisterModal}className="btn btn-sm">Cancel</Button>  &nbsp;  &nbsp;
                      <Button outline type="submit" value="submit" color="success" className="btn btn-sm">Register</Button>
                    </Col>
                  </Row>
                </LocalForm>
              </Container>
            </ModalBody>
            <ModalFooter className="modal-footer">
              <small><strong>Note : &nbsp;</strong> Please enter correct details!</small>
            </ModalFooter>
            <Modal isOpen={this.state.anyerrsign} id="modalwait">
              <ModalBody id="modalwaitbody">
                {this.state.errmsgsign}
              </ModalBody>
            </Modal>
            <Modal isOpen={this.state.isWaiting} id="modalwait">
              <ModalBody id="modalwaitbody">
                <Spinner style={{width:'2rem',height:'2rem',}} />
                <p><strong>Verifying...</strong></p>
              </ModalBody>
            </Modal>
          </Modal>
      </React.Fragment>
    );
  }
}

export default UserComp;