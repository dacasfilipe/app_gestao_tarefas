//arquivo javascript app.js
//testes node app.js
////var mysql = require('mysql2');

//código javascript em app.js
const express = require('express');
const app = express();
const mysql = require('mysql2');
// Configurando o express para aceitar JSON
app.use(express.json());
// Conexão com o banco de dados
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gestao_tarefas',
});
connection.connect(function (err) {
    if (err) throw err;
    console.log('Conectado!');
});
// CREATE
app.post('/tarefa', (req, res) => {
    const tarefas = req.body;
    // { "titulo": "estudar", "descricao":""}
    const sql = 'INSERT INTO tarefas SET ?';
    connection.query(sql, tarefas, (error, result) => {
        if (error) throw error;
        res.status(201).json({ id: result.insertId, ...tarefas });
    });
});
// READ
app.get('/livros', (req, res) => {
    const sql = 'SELECT * FROM Livros';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
app.get('/livros/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM Livros WHERE id = ?';
    connection.query(sql, id, (error, results) => {
        if (error) throw error;
        res.json(results[0]);
    });
});
// UPDATE
app.put('/livros/:id', (req, res) => {
    const id = req.params.id;
    const newBook = req.body;
    const sql = 'UPDATE Livros SET ? WHERE id = ?';
    connection.query(sql, [newBook, id], (error) => {
        if (error) throw error;
        res.status(204).end();
    });
});
// DELETE
app.delete('/livros/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM Livros WHERE id = ?';
    connection.query(sql, id, (error) => {
        if (error) throw error;
        res.status(204).end();
    });
});
// Configurando o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});