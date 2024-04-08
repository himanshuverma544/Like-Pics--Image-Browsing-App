import { Form, Input } from "reactstrap";

import { createPortal } from "react-dom";

import { useEffect } from "react";

import { auth } from "firebaseui";
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";

import LikeIcon from "../../assets/images/like-icon.png";


const AuthenticationModal = ({authenticationModalNode, closeAuthenticationModal}) => {

  useEffect(() => {

    const uiConfig = {
      signInOptions: [
        {
          provider: GoogleAuthProvider.PROVIDER_ID,
          fullLabel: "Continue with Google"
        },
      ],
      signInFlow: 'popup',
      signInSuccessUrl: '/',
      credentialHelper: auth.CredentialHelper.GOOGLE_YOLO,
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          return false;
        },
        uiShown: function() {
          document.getElementById('loader').style.display = 'none';
        }
      }
    };

    const ui = new auth.AuthUI(getAuth());
    ui.start('#firebase-ui-auth-container', uiConfig);

    return () => {
      ui.delete();
    };
  }, []);

  return createPortal(
    <div className="the-authentication-modal" onClick={closeAuthenticationModal}>
      <div ref={authenticationModalNode} className="authentication-content">
        <img className="app-icon auth-app-icon" src={LikeIcon} alt="Like Icon"/>
        <h1 className="auth-heading">Sign In to Like Pics</h1>
        <div id="firebase-ui-auth-container"></div>
        <div id="loader">Loading...</div>
        <hr></hr>
        <Form>
          <Input placeholder="Email"/>
          <Input placeholder="Password"/>
        </Form>
      </div>
    </div>,
    document.getElementById("authentication-modal")
  );
};


export default AuthenticationModal;