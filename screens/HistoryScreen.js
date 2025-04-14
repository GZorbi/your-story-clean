
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryScreen = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const storedStories = await AsyncStorage.getItem('storyHistory');
        if (storedStories) {
          setStories(JSON.parse(storedStories));
        }
      } catch (error) {
        console.error('Failed to load stories', error);
      }
    };

    loadStories();
  }, []);

  const clearHistory = async () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to delete all saved stories?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('storyHistory');
              setStories([]);
            } catch (error) {
              console.error('Failed to clear history', error);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Story History</Text>
      {stories.length === 0 ? (
        <Text style={styles.noStories}>No stories saved yet.</Text>
      ) : (
        <FlatList
          data={stories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.storyItem}>
              <Text style={styles.storyTitle}>Story #{index + 1}</Text>
              <Text>{item}</Text>
            </View>
          )}
        />
      )}
      <Button title="Clear History" onPress={clearHistory} color="#a00" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  noStories: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 30,
  },
  storyItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  storyTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default HistoryScreen;
