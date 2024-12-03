import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';

const Horarios = () => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  // Función para obtener los horarios
  const fetchHorarios = async () => {
    try {
      const response = await axios.get('https://uasdapi.ia3x.com/horarios');
      setHorarios(response.data);
    } catch (err) {
      setError('Error al obtener los horarios.');
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la selección de una clase
  const handleSelectClass = (classDetails) => {
    setSelectedClass(classDetails);
  };

  useEffect(() => {
    fetchHorarios(); // Obtener los horarios al montar el componente
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando horarios...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  // Renderizar cada clase
  const renderClassItem = ({ item }) => (
    <View style={styles.classItem}>
      <TouchableOpacity onPress={() => handleSelectClass(item)}>
        <Text style={styles.classText}>{item.materia} - {item.hora}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Horarios</Text>

      {/* Mostrar la lista de clases */}
      <FlatList
        data={horarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderClassItem}
      />

      {/* Si hay una clase seleccionada, mostrar el mapa */}
      {selectedClass && (
        <View style={styles.mapContainer}>
          <Text style={styles.selectedClassText}>
            {selectedClass.materia} - {selectedClass.hora}
          </Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: selectedClass.aula.lat,
              longitude: selectedClass.aula.lon,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: selectedClass.aula.lat,
                longitude: selectedClass.aula.lon,
              }}
              title="Ubicación del Aula"
              description={selectedClass.aula.nombre}
            />
          </MapView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  classItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  classText: {
    fontSize: 18,
    color: '#333',
  },
  selectedClassText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mapContainer: {
    flex: 1,
    marginTop: 20,
  },
  map: {
    width: '100%',
    height: 300,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Horarios;
