import { useState } from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonText } from '@ionic/react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import validator from 'validator';
import './ResetPasswordPage.css';

const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'initial' | 'pending' | 'success' | 'error'>('initial');

  const handleResetPassword = async () => {
    if (!validator.isEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setStatus('pending');

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setStatus('success');
    } catch (error) {
      const errorMessage = (error as { message: string }).message;
      alert(errorMessage);
      setStatus('error');
    }
  };

  return (
    <div className="reset-password-container">
      <IonItem>
        <IonLabel position="floating">Email</IonLabel>
        <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
      </IonItem>
      <IonButton expand="block" onClick={handleResetPassword} disabled={status === 'pending'}>
        {status === 'pending' ? 'Resetting password...' : 'Reset Password'}
      </IonButton>
      {status === 'success' && (
        <IonText color="success">Password reset email sent. Please check your inbox.</IonText>
      )}
      {status === 'error' && (
        <IonText color="danger">Failed to reset password. Please try again later.</IonText>
      )}
    </div>
  );
};

export default ResetPasswordPage;
