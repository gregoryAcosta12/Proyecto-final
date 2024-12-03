import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const navigation = useNavigation();

  // URL de la API de YouTube Data (debes poner tu propia clave de API)
  const youtubeAPIUrl = `https://uasdapi.ia3x.com/videos`;

  // Función para obtener los videos de YouTube
  const fetchVideos = async () => {
    try {
      const response = await axios.get(youtubeAPIUrl);
      setVideos(response.data.items); // Almacenar los videos en el estado
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar los videos.');
    }
  };

  // Usar useEffect para cargar los videos al montar el componente
  useEffect(() => {
    fetchVideos();
  }, []);

  // Función para navegar a la pantalla de video
  const navigateToVideo = (videoId) => {
    navigation.navigate('VideoPlayer', { videoId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Videos Educativos</Text>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.videoId}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.videoItem} onPress={() => navigateToVideo(item.id.videoId)}>
            <Text style={styles.videoTitle}>{item.snippet.title}</Text>
            <Text style={styles.videoDate}>{item.snippet.publishedAt}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  videoItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  videoDate: {
    fontSize: 14,
    color: '#555',
  },
});

export default Videos;
