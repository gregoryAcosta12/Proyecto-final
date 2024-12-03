import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import PushNotification from 'react-native-push-notification'; // Importar para las notificaciones

const Tasks = () => {
  // Lista de tareas (se puede reemplazar por datos reales o dinámicos)
  const tasks = [
    { id: 1, name: 'Tarea 1: Entregar informe', dueDate: '2024-12-05', url: 'https://moodle.uasd.edu.do' },
    { id: 2, name: 'Tarea 2: Estudiar para examen', dueDate: '2024-12-07', url: 'https://moodle.uasd.edu.do' },
    { id: 3, name: 'Tarea 3: Preparar presentación', dueDate: '2024-12-10', url: 'https://moodle.uasd.edu.do' },
  ];

  // Función para verificar si la tarea está próxima a vencer
  const checkDueDate = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const timeDifference = dueDateObj - currentDate;
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convertir de milisegundos a días

    return daysLeft <= 3 && daysLeft >= 0; // Si la tarea vence en 3 días o menos
  };

  // Función para abrir el aula virtual (enlace)
  const openVirtualClassroom = (url) => {
    Linking.openURL(url).catch((err) => Alert.alert('Error', 'No se pudo abrir el aula virtual.'));
  };

  // Función para enviar notificación si la tarea está próxima a vencer
  const sendNotification = (taskName) => {
    PushNotification.localNotification({
      title: "Tarea próxima a vencer",
      message: `Recuerda que la tarea: "${taskName}" está próxima a vencer.`,
    });
  };

  // Usar useEffect para crear notificaciones para tareas próximas a vencer
  useEffect(() => {
    tasks.forEach((task) => {
      if (checkDueDate(task.dueDate)) {
        sendNotification(task.name);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Tareas</Text>

      {tasks.map((task) => (
        <View key={task.id} style={[styles.taskItem, checkDueDate(task.dueDate) && styles.dueSoon]}>
          <Text style={styles.taskName}>{task.name}</Text>
          <Text style={styles.dueDate}>Fecha de vencimiento: {task.dueDate}</Text>
          <TouchableOpacity style={styles.button} onPress={() => openVirtualClassroom(task.url)}>
            <Text style={styles.buttonText}>Ira l Aula Virtual</Text>
          </TouchableOpacity>
        </View>
      ))}
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
  taskItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dueDate: {
    fontSize: 14,
    color: '#555',
  },
  dueSoon: {
    backgroundColor: '#FFEB3B', 
  },
  button: {
    marginTop: 10,
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
});

export default Tasks;
