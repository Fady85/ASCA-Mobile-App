import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import React from 'react';
import { IonButton, IonHeader, IonTitle, IonToolbar ,IonButtons} from '@ionic/react';
import {personCircle ,camera, podium , cog} from 'ionicons/icons';

import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';



export function usePhotoGallery() {
  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
      
    });
  };

  return {
    takePhoto,
    
  };
}

setupIonicReact();


const App: React.FC = () => {
  const { takePhoto } = usePhotoGallery();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Your logic to check if user is logged in or not
    // Update the state of isLoggedIn accordingly
  }, []);


  return (
    <IonApp>
      
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/reset" component={ResetPasswordPage} />
            <Route exact path="/tab1">
              <Tab1 />
            </Route>
            <Route exact path="/tab2">
              <Tab2 />
            </Route>
            <Route path="/tab3">
              <Tab3 />
            </Route>
            
          </IonRouterOutlet>


      <IonHeader>
        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton>
              <IonIcon slot="icon-only" icon={personCircle} size="large" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1" onClick={() => takePhoto()}>
              <IonIcon aria-hidden="true" icon={camera} />
              <IonLabel>Camera</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon aria-hidden="true" icon={podium} />
              <IonLabel>Tab 2</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon aria-hidden="true" icon={cog} />
              <IonLabel>Tab 3</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};
export default App;
