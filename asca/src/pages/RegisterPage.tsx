import React, { useState } from 'react';
import { IonInput, IonButton, IonIcon } from '@ionic/react';
import { personOutline, lockClosedOutline, logInOutline, logoGoogle } from 'ionicons/icons';
import { useHistory, Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database";
import "firebase/compat/storage";

import './RegisterPage.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Initialize the history object
  const history = useHistory();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    try {
      const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log(result);
      const user = firebase.auth().currentUser;
      await user?.updateProfile({ displayName: displayName });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = () => {
    history.push('/');
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <div className="input-group">
        <IonIcon icon={personOutline} />
        <IonInput placeholder="Display Name" onIonChange={(e) => setDisplayName(e.detail.value!)} />
      </div>
      <div className="input-group">
        <IonIcon icon={logInOutline} />
        <IonInput placeholder="Email" onIonChange={(e) => setEmail(e.detail.value!)} />
      </div>
      <div className="input-group">
        <IonIcon icon={lockClosedOutline} />
        <IonInput placeholder="Password" type="password" onIonChange={(e) => setPassword(e.detail.value!)} />
      </div>
      <div className="input-group">
        <IonIcon icon={lockClosedOutline} />
        <IonInput placeholder="Confirm Password" type="password" onIonChange={(e) => setConfirmPassword(e.detail.value!)} />
      </div>
      <IonButton onClick={handleRegister}>Register</IonButton>
      <IonButton onClick={handleGoogleSignIn}>
        <IonIcon icon={logoGoogle} />
        <span>Sign in with Google</span>
      </IonButton>
      <div className="signIn-section">
        <span>Already have an account? </span>
        <Link to="/">Log In</Link>
      </div>
    </div>
  );
};

export default Register;
