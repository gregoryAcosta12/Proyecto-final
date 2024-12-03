// screens/Landing.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Landing = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la UASD</Text>
      <Text style={styles.description}>Misión, Visión y Valores de la UASD</Text>
      <Button title="Iniciar Sesión" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default Landing;