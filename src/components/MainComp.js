import React from 'react';
import {Route, Redirect,Switch} from 'react-router-dom';
import UserComp from './UserComp';
import LogoutComp from './LogoutComp';
import HeaderComp from './HeaderComp';
import firebase from '../config/firebase';
import FooterComp from './FooterComp';
import PrivacyComp from './PrivacyComp';
import ProfileComp from './ProfileComp';
import EducationComp from './EducationComp';
import ProjectComp from './ProjectComp'
import TechSkillComp from './TechSkillComp'
import OtherComp from './OtherComp';
import WaitComp from './WaitComp'

class MainComp extends React.Component{
  constructor(props){
    super(props);
    this.state={
      uid:null,
    };
  }

  componentDidMount(){
    this.authListener();
  }
  authListener(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({uid:firebase.auth().currentUser.uid});
      }
      else{
        this.setState({uid:null});
      }
    })
  }
  render(){
    return(
      <React.Fragment>
        <div className="body">
          <HeaderComp/>
          {this.state.uid?(
            <>
              <WaitComp/>
              <LogoutComp/>
              <ProfileComp uid={this.state.uid}/>
              <EducationComp uid={this.state.uid}/>
              <ProjectComp uid={this.state.uid}/>
              <TechSkillComp uid={this.state.uid}/>
              <OtherComp uid={this.state.uid}/>
            </>
            ):(<UserComp/>)}
          <Switch>
            <Route exact path="/privacy" component={()=><PrivacyComp/>}></Route>
            <Redirect to="/"/>
          </Switch>
          <FooterComp/>
          </div>
      </React.Fragment>
    );
  }
}

export default MainComp;