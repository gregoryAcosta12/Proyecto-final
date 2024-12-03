import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para obtener las solicitudes
  const fetchSolicitudes = async () => {
    try {
      const response = await axios.get('https://uasdapi.ia3x.com/solicitud');
      setSolicitudes(response.data);
    } catch (err) {
      setError('Error al obtener las solicitudes.');
    } finally {
      setLoading(false);
    }
  };

  // Función para crear una nueva solicitud
  const handleSubmitSolicitud = async () => {
    if (!titulo || !descripcion) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post('https://uasdapi.ia3x.com/crear_solicitud', {
        titulo,
        descripcion,
      });
      Alert.alert('Éxito', 'Solicitud enviada correctamente.');
      fetchSolicitudes(); // Recargar las solicitudes después de enviar una
      setTitulo('');
      setDescripcion('');
    } catch (err) {
      Alert.alert('Error', 'No se pudo enviar la solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchSolicitudes(); // Obtener las solicitudes al montar el componente
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando solicitudes...</Text>
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

  // Función para manejar el clic en una solicitud y mostrar detalles
  const renderSolicitudItem = ({ item }) => {
    return (
      <View style={styles.solicitudItem}>
        <Text style={styles.solicitudTitle}>{item.titulo}</Text>
        <Text style={styles.solicitudDescription}>{item.descripcion}</Text>
        <Text style={styles.solicitudStatus}>Estado: {item.estado}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitudes Administrativas</Text>

      {/* Formulario para crear una nueva solicitud */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Título de la solicitud"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción de la solicitud"
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmitSolicitud}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>{isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de solicitudes */}
      <FlatList
        data={solicitudes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSolicitudItem}
      />
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
  form: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#0056B3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  solicitudItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  solicitudTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  solicitudDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  solicitudStatus: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Solicitudes;
