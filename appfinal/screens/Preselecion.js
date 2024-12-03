import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Preseleccion = () => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para obtener las asignaturas disponibles
  const fetchAsignaturas = async () => {
    try {
      const response = await axios.get('https://uasdapi.ia3x.com/ver_preseleccion');
      setAsignaturas(response.data);
    } catch (err) {
      setError('Error al obtener las asignaturas.');
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la selección de asignaturas
  const handleSelectAsignatura = (id) => {
    if (seleccionadas.includes(id)) {
      setSeleccionadas(seleccionadas.filter((asignaturaId) => asignaturaId !== id));
    } else {
      setSeleccionadas([...seleccionadas, id]);
    }
  };

  // Función para enviar las preselecciones al servidor
  const handleSubmitPreseleccion = async () => {
    if (seleccionadas.length === 0) {
      Alert.alert('Error', 'Debe seleccionar al menos una asignatura.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Enviar preselección al servidor
      await axios.post('https://uasdapi.ia3x.com/preseleccion', {
        asignaturas: seleccionadas,
      });
      Alert.alert('Éxito', 'Preselección registrada correctamente.');
    } catch (err) {
      Alert.alert('Error', 'No se pudo registrar la preselección.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchAsignaturas(); // Obtener las asignaturas al montar el componente
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando asignaturas...</Text>
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

  // Renderizar cada asignatura
  const renderAsignaturaItem = ({ item }) => {
    const isSelected = seleccionadas.includes(item.id);
    return (
      <View style={styles.asignaturaItem}>
        <TouchableOpacity onPress={() => handleSelectAsignatura(item.id)}>
          <Text style={[styles.asignaturaTitle, isSelected && styles.selected]}>
            {item.nombre}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preselección de Asignaturas</Text>

      {/* Lista de asignaturas disponibles */}
      <FlatList
        data={asignaturas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAsignaturaItem}
      />

      {/* Botón para enviar la preselección */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmitPreseleccion}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? 'Enviando...' : 'Confirmar Preselección'}
        </Text>
      </TouchableOpacity>
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
  asignaturaItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  asignaturaTitle: {
    fontSize: 18,
    color: '#333',
  },
  selected: {
    color: '#0056B3',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#0056B3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Preseleccion;
