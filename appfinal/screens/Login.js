import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://uasdapi.ia3x.com/login', {
        username: username,
        password: password
      });

      if (response.data && response.data.token) {
        // Si la respuesta es exitosa y contiene un token
        Alert.alert('Login Exitoso', 'Bienvenido a la plataforma.');
        // Guardamos el token (puedes guardarlo en AsyncStorage si lo necesitas)
        // navigation.navigate('MainMenu');
      } else {
        Alert.alert('Error', 'Credenciales incorrectas.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al intentar iniciar sesión.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <Button title="Recuperar Contraseña" onPress={() => Alert.alert('Recuperar Contraseña')} />
      <Button title="Estudia con Nosotros" onPress={() => Alert.alert('Redirigiendo a inscripción')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default Login;
