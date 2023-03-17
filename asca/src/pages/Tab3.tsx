import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import {
  IonButtons,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import {personCircle ,camera, podium , cog} from 'ionicons/icons';

const Tab3: React.FC = () => {
  return (
    <IonPage>
          
          <IonHeader>

          </IonHeader>
          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Tab 3</IonTitle>
              </IonToolbar>
            </IonHeader>
            <ExploreContainer name="Tab 3 page" />
          </IonContent>
    
    
          <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/tab1">
                  <IonIcon aria-hidden="true" icon={camera} />
                  <IonLabel>Camera</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/tab2">
                  <IonIcon aria-hidden="true" icon={podium} />
                  <IonLabel>leaderboards</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/tab3">
                  <IonIcon aria-hidden="true" icon={cog} />
                  <IonLabel>Settings</IonLabel>
                </IonTabButton>
              </IonTabBar>
        </IonPage>
  );
};

export default Tab3;
