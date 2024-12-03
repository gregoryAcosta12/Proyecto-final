// screens/About.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Acerca de los Desarrolladores</Text>

      <View style={styles.developerInfo}>
        <Image
         
          style={styles.developerImage}
        />
        <Text style={styles.developerName}>Emelyn Del Carmen</Text>
        <Text style={styles.developerMatricula}>Matrícula: 2022-1806</Text>
        <Text style={styles.developerRole}>Desarrollador Frontend</Text>
      </View>

      <View style={styles.developerInfo}>
     
        <Text style={styles.developerName}>Gregory Acosta</Text>
        <Text style={styles.developerMatricula}>Matrícula: 2022-1974</Text>
        <Text style={styles.developerRole}>Desarrolladora Backend</Text>
      </View>

      <View style={styles.developerInfo}>
     
        <Text style={styles.developerName}>Esteilor Paniagua</Text>
        <Text style={styles.developerMatricula}>Matrícula: 2022-1966</Text>
        <Text style={styles.developerRole}>Desarrolladora Backend</Text>
      </View>

      <View style={styles.developerInfo}>
     
        <Text style={styles.developerName}>Esteilor Paniagua</Text>
        <Text style={styles.developerMatricula}>Matrícula: 2022-0950</Text>
        <Text style={styles.developerRole}>Desarrolladora Backend</Text>
      </View>

      <View style={styles.developerInfo}>
    
        <Text style={styles.developerName}>Eduardo Miguel</Text>
        <Text style={styles.developerMatricula}>Matrícula: 20221-968</Text>
        <Text style={styles.developerRole}>Desarrolladora Backend</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          &copy; 2024 UASD. Todos los derechos reservados.{' '}
          <Text
            style={styles.footerLink}
            onPress={() => {
            
            }}
          >
            Visítanos
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#E0F7FA',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0056B3',
    textAlign: 'center',
    marginBottom: 40,
    textTransform: 'uppercase',
  },
  developerInfo: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Esta propiedad no es válida en React Native, se puede lograr con efectos de sombras
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  developerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  developerName: {
    fontSize: 20,
    color: '#333',
    marginBottom: 5,
  },
  developerMatricula: {
    fontSize: 16,
    color: '#555',
  },
  developerRole: {
    fontSize: 16,
    color: '#555',
  },
  footer: {
    marginTop: 40,
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  footerText: {
    color: '#555',
  },
  footerLink: {
    color: '#0056B3',
    textDecorationLine: 'underline',
  },
});

export default About;
