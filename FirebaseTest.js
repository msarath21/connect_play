import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { auth } from './firebase/firebase.config';

export default function FirebaseTest() {
  const [status, setStatus] = useState('Testing Firebase connection...');
  const [isConnected, setIsConnected] = useState(false);

  const testConnection = async () => {
    try {
      setStatus('Testing Firebase connection...');
      const result = await signInAnonymously(auth);
      console.log('Firebase connection successful', result);
      setStatus('Firebase connection successful!');
      setIsConnected(true);
    } catch (error) {
      console.error('Firebase connection failed:', error);
      setStatus(`Firebase connection failed: ${error.message}`);
      setIsConnected(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Connection Test</Text>
      <Text style={[
        styles.status, 
        isConnected ? styles.success : styles.pending
      ]}>
        {status}
      </Text>
      <Button
        title="Test Firebase Connection"
        onPress={testConnection}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
  pending: {
    color: 'blue',
  },
}); 