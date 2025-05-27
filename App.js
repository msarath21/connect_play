import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';
import LoginScreen from './app/screens/LoginScreen';
import { auth } from './firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Add a timeout to ensure the app shows something even if there's an issue
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user ? "User is signed in" : "User is signed out");
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  console.log("App.js loaded - authentication status:", isAuthenticated);
  
  try {
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading Game Collection...</Text>
        </View>
      );
    }

    if (hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Something went wrong. Please restart the app.</Text>
        </View>
      );
    }

    // If not authenticated, show login screen
    if (!isAuthenticated) {
      return (
        <SafeAreaProvider>
          <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />
        </SafeAreaProvider>
      );
    }

    // If authenticated, show the main app
    return (
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    );
  } catch (error) {
    console.error("Error in App.js:", error);
    setHasError(true);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Something went wrong. Please restart the app.</Text>
      </View>
    );
  }
}