require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expensesRouter = require('./routes/expenses');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para manejar JSON
app.use(express.json());

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a la base de datos');
}).catch((err) => {
    console.error('Error conectando a la base de datos', err);
});

// Usar rutas de gastos
app.use('/api/expenses', expensesRouter);

// Servir archivos estáticos
app.use(express.static('frontend'));

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
