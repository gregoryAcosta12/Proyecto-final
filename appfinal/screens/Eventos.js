import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();

  // Función para obtener eventos de la API
  const fetchEvents = async () => {
    try {
      const response = await fetch('');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar la lista de eventos.');
    }
  };

  // Usar useEffect para cargar los eventos al montar el componente
  useEffect(() => {
    fetchEvents();
  }, []);

  // Función para navegar a la vista de detalles de un evento
  const navigateToEventDetails = (event) => {
    navigation.navigate('EventDetails', { event });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos de la UASD</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.eventItem} onPress={() => navigateToEventDetails(item)}>
            <Text style={styles.eventName}>{item.name}</Text>
            <Text style={styles.eventDate}>Fecha: {item.date}</Text>
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
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDate: {
    fontSize: 14,
    color: '#555',
  },
});

export default Events;
