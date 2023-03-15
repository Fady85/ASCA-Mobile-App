import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

const ScanQrPage: React.FC = () => {
  const [scannedText, setScannedText] = useState('');

  useEffect(() => {
    if (isPlatform('cordova')) {
      // On native, use the QRScanner plugin to scan QR codes
      QRScanner.prepare()
        .then((status: QRScannerStatus) => {
          if (status.authorized) {
            // Camera permission was granted
            const scanSub = QRScanner.scan().subscribe((text: string) => {
              console.log('Scanned something', text);
              setScannedText(text);
              QRScanner.hide(); // Hide camera preview
              scanSub.unsubscribe(); // Stop scanning
            });
            QRScanner.show(); // Show camera preview
          } else if (status.denied) {
            // Camera permission was permanently denied
            // You must use QRScanner.openSettings() method to guide the user to the settings page
            // then they can grant the permission from there
          } else {
            // Permission was denied, but not permanently. You can ask for permission again at a later time.
          }
        })
        .catch((e: any) => console.log('Error is', e));
    } else {
      // On web, show a placeholder message
      setScannedText('QR code scanning is not supported on web');
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Scan QR code</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Scan QR code</IonTitle>
          </IonToolbar>
        </IonHeader>
        <p>Scanned QR code: {scannedText}</p>
        {isPlatform('cordova') && (
          <IonButton onClick={() => QRScanner.show()}>Open camera</IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ScanQrPage;
