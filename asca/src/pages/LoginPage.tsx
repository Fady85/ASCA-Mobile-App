import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonLabel } from '@ionic/react';
import { useHistory, Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database";
import "firebase/compat/storage";
import './LoginPage.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push('/dashboard');
    } catch (error) {
      const errorMessage = (error as { message: string }).message;
      alert(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      history.push('/dashboard');
    } catch (error) {
      const errorMessage = (error as { message: string }).message;
      alert(errorMessage);
    }
  };

  const handleForgotPassword = () => {
    history.push('/reset');
  };

  const handleRegisterNow = () => {
    history.push('/register');
  };

  return (
    <div className="login-container">
      <IonItem>
        <IonLabel position="floating">Email</IonLabel>
        <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Password</IonLabel>
        <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
      </IonItem>
      <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
      <IonButton className="google-login-button" expand="block" onClick={handleGoogleLogin}>Sign in with Google</IonButton>
      <IonButton className="forgot-password-button" size="small" fill="clear" onClick={handleForgotPassword}>Forgot password?</IonButton>
      <IonButton className="register-now-button" size="small" fill="clear" onClick={handleRegisterNow}>Register now</IonButton>
    </div>
  );
};

export default Login;
