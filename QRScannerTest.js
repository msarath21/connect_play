import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Platform } from 'react-native';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';

export default function QRScannerTest() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('No data scanned yet');
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    setDebugInfo(`Platform: ${Platform.OS}, Version: ${Platform.Version}`);
    requestPermission();
  }, []);

  const handleBarcodeScanned = (scanningResult) => {
    if (scanned) return;
    
    setScanned(true);
    const { type, data } = scanningResult;
    setScannedData(`Barcode with type ${type} and data ${data} has been scanned!`);
    console.log(`Barcode with type ${type} and data ${data} has been scanned!`);
  };

  const handleRequestPermission = async () => {
    try {
      const result = await requestPermission();
      setDebugInfo(`Permission request result: ${JSON.stringify(result)}`);
    } catch (error) {
      setDebugInfo(`Permission error: ${error.message}`);
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
        <Text style={styles.debugText}>{debugInfo}</Text>
        <Button 
          title="Manual Request Permission" 
          onPress={handleRequestPermission} 
          color="#673AB7"
        />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
        <Text style={styles.debugText}>{debugInfo}</Text>
        <Text style={styles.debugText}>Permission: {JSON.stringify(permission)}</Text>
        <Button 
          title="Grant Permission" 
          onPress={handleRequestPermission} 
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
        <CameraView
          style={styles.camera}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
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