import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

class GoogleAuth extends React.Component{

  // state={
  //   isSignedIn : null
  // };

  componentDidMount(){
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId:'730568337757-8ft0l0juc3dl7osq74c5530nthp6otms.apps.googleusercontent.com',
        scope:'email'
      }).then(() => {
            this.auth = window.gapi.auth2.getAuthInstance();
            //dispatch an initial action to indicate user is signed in or not instead of this
            //this.setState({isSignedIn : this.auth.isSignedIn.get()});
            this.onAuthChange(this.auth.isSignedIn.get());
            this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if(isSignedIn){
      this.props.signIn();
    }else{
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton(){
    if (this.props.isSignedIn === null){
      return null;
    }else if (this.props.isSignedIn){
      return (
        <button onClick={this.onSignOutClick} className='ui red google button'>
          <i className='google icon' />
          Sign Out
        </button>
      );
    }else{
      return (
        <button onClick={this.onSignInClick} className='ui red google button'>
          <i className='google icon' />
          Sign In with Google
        </button>
      );
    }
  }

  render(){
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn:state.auth.isSignedIn };
}

export default connect(
  mapStateToProps,
  {
    signIn,
    signOut
  }
)(GoogleAuth);
