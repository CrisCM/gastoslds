const express = require('express');
const multer = require('multer');
const Expense = require('../models/expense');
const router = express.Router();

// Configuración de multer para manejar archivos
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Ruta para crear un nuevo gasto
router.post('/', upload.single('receipt'), async (req, res) => {
    try {
        const { category, amount } = req.body;
        const receiptPath = req.file.path;
        const date = new Date();

        const newExpense = new Expense({ category, amount, receiptPath, date });
        await newExpense.save();

        res.status(201).send('Gasto registrado exitosamente');
    } catch (err) {
        res.status(500).send('Error al registrar el gasto');
    }
});

// Ruta para obtener todos los gastos
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).send('Error al obtener los gastos');
    }
});

module.exports = router;
