import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Simple version of the app with no Firebase or complex navigation
const FixedApp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.headerTitle}>Game Collection</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* TicTacToe Game */}
          <View style={styles.gameCard}>
            <View style={styles.gameButton}>
              <View style={styles.gameIconContainer}>
                <Ionicons name="grid-outline" size={32} color="#4CAF50" />
              </View>
              <View style={styles.gameInfo}>
                <Text style={styles.gameTitle}>Tic Tac Toe</Text>
                <Text style={styles.gameDescription}>
                  Play the classic game against AI
                </Text>
                <View style={styles.playButtonTic}>
                  <Text style={styles.playButtonText}>Play Now</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={14}
                    color="white"
                    style={styles.arrowIcon}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Lucky Wheel Game */}
          <View style={styles.gameCard}>
            <View style={styles.gameButton}>
              <View style={[styles.gameIconContainer, styles.wheelIconContainer]}>
                <Ionicons name="disc-outline" size={32} color="#FFA000" />
              </View>
              <View style={styles.gameInfo}>
                <Text style={[styles.gameTitle, styles.wheelTitle]}>Spin the Wheel</Text>
                <Text style={styles.gameDescription}>
                  Try your luck with our prize wheel
                </Text>
                <View style={styles.playButtonWheel}>
                  <Text style={styles.playButtonText}>Spin Now</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={14}
                    color="white"
                    style={styles.arrowIcon}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Firebase Test Button */}
          <View style={styles.gameCard}>
            <View style={styles.gameButton}>
              <View style={[styles.gameIconContainer, { backgroundColor: 'rgba(255, 87, 34, 0.1)' }]}>
                <Ionicons name="flame" size={32} color="#FF5722" />
              </View>
              <View style={styles.gameInfo}>
                <Text style={[styles.gameTitle, { color: '#FF5722' }]}>Firebase Test</Text>
                <Text style={styles.gameDescription}>
                  Test Firebase connectivity
                </Text>
                <TouchableOpacity
                  style={[styles.playButtonTic, { backgroundColor: '#FF5722' }]}
                  onPress={() => alert('Firebase test will be added later')}
                >
                  <Text style={styles.playButtonText}>Test</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={16}
                    color="white"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 15,
    backgroundColor: '#673AB7',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    elevation: 4,
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    padding: 15,
  },
  gameCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 20,
  },
  gameButton: {
    flexDirection: 'row',
    padding: 16,
  },
  gameIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 15,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  wheelIconContainer: {
    backgroundColor: 'rgba(255, 160, 0, 0.1)',
  },
  gameInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  wheelTitle: {
    color: '#FFA000',
  },
  gameDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  playButtonTic: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  playButtonWheel: {
    backgroundColor: '#FFA000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  arrowIcon: {
    marginLeft: 4,
  },
});

export default FixedApp; 