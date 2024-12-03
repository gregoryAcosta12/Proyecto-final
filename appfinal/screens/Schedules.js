// screens/Schedules.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Schedules = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        // Usando fetch
        const response = await fetch('https://api.example.com/schedules');
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error al obtener los horarios:", error);
      } finally {
        setLoading(false);
      }

   
    };

    fetchSchedules();
  }, []);

  // Función para abrir el modal del mapa
  const openMap = (classData) => {
    setSelectedClass(classData);
    setIsModalVisible(true);
  };

  // Función para cerrar el modal
  const closeMap = () => {
    setIsModalVisible(false);
    setSelectedClass(null);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando horarios...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Horarios</Text>

      {classes.length > 0 ? (
        classes.map((classData) => (
          <TouchableOpacity key={classData.id} style={styles.classItem} onPress={() => openMap(classData)}>
            <Text style={styles.className}>{classData.name}</Text>
            <Text style={styles.classDetails}>Hora: {classData.time}</Text>
            <Text style={styles.classDetails}>Aula: {classData.room}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No se encontraron horarios disponibles.</Text>
      )}

      {/* Modal para mostrar el mapa */}
      {selectedClass && (
        <Modal visible={isModalVisible} animationType="slide" transparent={false}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedClass.name}</Text>
            <Text style={styles.modalDetails}>Hora: {selectedClass.time}</Text>
            <Text style={styles.modalDetails}>Aula: {selectedClass.room}</Text>

            <MapView
              style={styles.map}
              initialRegion={{
                latitude: selectedClass.latitude,
                longitude: selectedClass.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              <Marker coordinate={{ latitude: selectedClass.latitude, longitude: selectedClass.longitude }} />
            </MapView>

            <TouchableOpacity style={styles.closeButton} onPress={closeMap}>
              <Text style={styles.closeButtonText}>Cerrar Mapa</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
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
  classItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Para imitar sombra (esto no funciona en React Native, lo puedes simular con elevation)
  },
  className: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  classDetails: {
    fontSize: 14,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#0056B3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Schedules;
