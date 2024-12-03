// screens/News.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import fetchNews from 'https://uasdapi.ia3x.com/noticias'; // Traemos la función de api.js

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener las noticias al montar el componente
  useEffect(() => {
    const getNews = async () => {
      const newsData = await fetchNews();
      setNews(newsData);
      setLoading(false); // Terminamos de cargar
    };
    getNews();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando noticias...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsDescription}>{item.description}</Text>
            <TouchableOpacity onPress={() => { /* Aquí puedes abrir el enlace de la noticia */ }}>
              <Text style={styles.newsLink}>Leer más...</Text>
            </TouchableOpacity>
          </View>
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
  newsItem: {
    marginBottom: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  newsTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  newsDescription: {
    fontSize: 14,
    marginVertical: 8,
  },
  newsLink: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default News;
