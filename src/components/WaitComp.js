import React from 'react';
import {Spinner, ModalBody,Modal} from 'reactstrap'

class WaitComp extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isWaiting:true
    };
  }

  componentDidMount(){
    this.pleaseWait();
  }
  pleaseWait(){
    setTimeout(()=>{
      this.setState({isWaiting:!this.state.isWaiting});
    },1500);
  }

  render(){
    return(
      <Modal isOpen={this.state.isWaiting} id="modalwait">
        <ModalBody id="modalwaitbody">
          <Spinner style={{width:'2rem',height:'2rem',}} />
          <p><strong>Loading...</strong></p>
        </ModalBody>
      </Modal>
    )
  }
}

export default WaitComp;