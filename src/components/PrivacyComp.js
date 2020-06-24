import React from 'react';
class PrivacyComp extends React.Component{
  render(){
    return(
      <div className="text-center privacy">
        <h3>Data Encryption</h3>
        <p id="encrypt"><strong>My Info</strong> encrypts data in transit using HTTPS and logically isolate users data.</p>
        <p>To keep personal data safe, My Info employs extensive security measures to minimize access:</p>
        <ul className="list-styled">
          <li id="access">My Info only permits access to personal data by user who sign in with Google Sign-In.</li>
        </ul>
        <h5>Still have Questions? Click on Contact.</h5>
      </div>
    )
  }
}

export default PrivacyComp;