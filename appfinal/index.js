// server.js
const express = require('express');
const app = express();
const port = 3000;

// Datos simulados (en un entorno real, estos datos vendrían de una base de datos o servicios externos)
const news = [
  { id: 1, title: 'Nueva Carrera en la UASD', content: 'La UASD lanza una nueva carrera para los estudiantes.' },
  { id: 2, title: 'Eventos Académicos 2024', content: 'La universidad organiza varios eventos académicos en el próximo semestre.' },
];

const schedule = [
  { course: 'Matemáticas I', time: 'Lunes 8:00 AM - 10:00 AM', classroom: 'Aula 101' },
  { course: 'Programación Avanzada', time: 'Martes 10:00 AM - 12:00 PM', classroom: 'Aula 202' },
];

const events = [
  { id: 1, name: 'Conferencia sobre Inteligencia Artificial', date: '2024-12-05', location: 'Auditorio Principal' },
  { id: 2, name: 'Taller de Desarrollo Web', date: '2024-12-10', location: 'Sala de Conferencias' },
];

const debt = {
  amount: 1200.50,
  status: 'Pendiente',
  paymentLink: 'https://www.uasd.edu.do/pagos'
};

const tasks = [
  { id: 1, title: 'Entregar proyecto de matemáticas', dueDate: '2024-12-03', virtualClassLink: 'https://moodle.uasd.edu.do/course/view.php?id=123' },
  { id: 2, title: 'Examen de programación', dueDate: '2024-12-07', virtualClassLink: 'https://moodle.uasd.edu.do/course/view.php?id=456' },
];

// Rutas de la API
app.get('/api/news', (req, res) => {
  res.json(news);
});

app.get('/api/schedule', (req, res) => {
  res.json(schedule);
});

app.get('/api/events', (req, res) => {
  res.json(events);
});

app.get('/api/debt', (req, res) => {
  res.json(debt);
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Endpoint raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de la UASD');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
