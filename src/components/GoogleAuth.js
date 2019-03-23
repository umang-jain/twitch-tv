import React from 'react';

class GoogleAuth extends React.Component{
  componentDidMount(){
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId:'730568337757-8ft0l0juc3dl7osq74c5530nthp6otms.apps.googleusercontent.com',
        scope:'email'
      })
    });

  }
  render(){
    return (
      <div>
        GoogleAuth
      </div>
    );
  }
}

export default GoogleAuth;
