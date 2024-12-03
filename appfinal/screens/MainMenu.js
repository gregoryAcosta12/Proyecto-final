// screens/MainMenu.js
import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';

const MainMenu = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro que deseas cerrar sesión?", [
      { text: "Cancelar" },
      { text: "Sí", onPress: () => navigation.navigate('Login') }, // Asume que tienes una pantalla de Login
    ]);
  };

  return (
    <View style={styles.container}>
      <Button title="Noticias" onPress={() => navigation.navigate('News')} />
      <Button title="Horarios" onPress={() => navigation.navigate('Schedules')} />
      <Button title="Preselección" onPress={() => navigation.navigate('Preselection')} />
      <Button title="Deuda" onPress={() => navigation.navigate('Debt')} />
      <Button title="Solicitudes" onPress={() => navigation.navigate('Requests')} />
      <Button title="Mis Tareas" onPress={() => navigation.navigate('Tasks')} />
      <Button title="Eventos" onPress={() => navigation.navigate('Events')} />
      <Button title="Videos" onPress={() => navigation.navigate('Videos')} />
      <Button title="Acerca de" onPress={() => navigation.navigate('About')} />
      <Button title="Salir" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default MainMenu;
