import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Deudas = () => {
  const [deudas, setDeudas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para obtener las deudas del estudiante desde la API
    const fetchDeudas = async () => {
      try {
        const response = await axios.get('https://uasdapi.ia3x.com/deudas');
        setDeudas(response.data); // Asignamos los datos a la variable de estado
      } catch (err) {
        setError('No se pudo obtener la información de las deudas.');
        Alert.alert('Error', 'No se pudo obtener la información de las deudas.');
      } finally {
        setLoading(false); // Terminamos la carga
      }
    };

    fetchDeudas();
  }, []);

  // Si estamos cargando, mostramos un indicador de carga
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando las deudas...</Text>
      </View>
    );
  }

  // Si hay un error, mostramos un mensaje de error
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  // Función para manejar el clic en una deuda y mostrar más detalles
  const handleDeudaPress = (deuda) => {
    Alert.alert('Detalles de la deuda', `Monto: ${deuda.monto}\nFecha de vencimiento: ${deuda.fecha_vencimiento}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deudas del Estudiante</Text>

      {/* Si no hay deudas, mostramos un mensaje */}
      {deudas.length === 0 ? (
        <Text style={styles.noDeudas}>No hay deudas registradas para este estudiante.</Text>
      ) : (
        <FlatList
          data={deudas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.deudaItem}
              onPress={() => handleDeudaPress(item)}
            >
              <Text style={styles.deudaText}>{item.materia}</Text>
              <Text style={styles.deudaText}>Monto: {item.monto}</Text>
              <Text style={styles.deudaText}>Fecha de Vencimiento: {item.fecha_vencimiento}</Text>
            </TouchableOpacity>
          )}
        />
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
  deudaItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  deudaText: {
    fontSize: 16,
    color: '#333',
  },
  noDeudas: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Deudas;
