import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Platform } from 'react-native';
import * as ExpoCamera from 'expo-camera';

export default function SimplerQRScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('No data scanned yet');
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      try {
        setDebugInfo(`Platform: ${Platform.OS}, SDK: ${ExpoCamera.SDK_VERSION || 'unknown'}`);
        const { status } = await ExpoCamera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        setDebugInfo(prev => `${prev}\nPermission status: ${status}`);
      } catch (error) {
        setDebugInfo(prev => `${prev}\nError: ${error.message}`);
      }
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(`Bar code with type ${type} and data ${data} has been scanned!`);
    setDebugInfo(prev => `${prev}\nScanned: ${type} - ${data}`);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
        <Text style={styles.debugText}>{debugInfo}</Text>
      </View>
    );
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
        <Text style={styles.debugText}>{debugInfo}</Text>
        <Button 
          title="Try Again" 
          onPress={async () => {
            const { status } = await ExpoCamera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            setDebugInfo(prev => `${prev}\nNew permission request: ${status}`);
          }} 
          color="#673AB7"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Scanner Test</Text>
      <Text style={styles.debugText}>{debugInfo}</Text>
      
      <View style={styles.cameraContainer}>
        {/* Try using Camera component if CameraView is not working */}
        <ExpoCamera.Camera
          style={styles.camera}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          barCodeScannerSettings={{
            barCodeTypes: [ExpoCamera.BarCodeScanner.Constants.BarCodeType.qr],
          }}
        />
      </View>
      
      <Text style={styles.results}>{scannedData}</Text>
      
      {scanned && (
        <Button
          title="Tap to Scan Again"
          onPress={() => setScanned(false)}
          color="#673AB7"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#673AB7',
  },
  cameraContainer: {
    width: '100%',
    height: 300,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  debugText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
    backgroundColor: '#eee',
    padding: 5,
    borderRadius: 5,
    width: '100%',
  },
  results: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    width: '100%',
  },
}); 