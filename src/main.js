import express from 'express';
import sqlite3 from 'sqlite3';
import { Category } from './models/category.js';

const db = new sqlite3.Database('mocaliza_db.db');
const app = express(); // Ao Carregar a biblioteca, o express cria uma função. Ao chamar a 
                       //função e atribuir para app, é criada uma instancia da biblioteca

// db.serialize(() => {
//     db.run(`CREATE TABLE IF NOT EXISTS categories (
//         id INTEGER NOT NULL,
//         name VARCHAR(255) NOT NULL,
//         updatedAt TIMESTAMP,
//         createdAt TIMESTAMP,
//         active BOOLEAN,
//         CONSTRAINT categories_pk PRIMARY KEY (id)
//     );`);
//     db.run(`INSERT INTO categories(name) VALUES ('CARROS')`);
//     db.run(`INSERT INTO categories(name) VALUES ('MOTOS')`);
//     db.run(`INSERT INTO categories(name) VALUES ('TRATORES')`);
//     db.run(`INSERT INTO categories(name) VALUES ('SUV')`);
//     db.run(`INSERT INTO categories(name) VALUES ('MOTO')`);
// });

app.get('/', (request, response) => {
    const categories = new Array();
    db.serialize(() => {
        db.each(`SELECT * from categories`, (err, row) => {
            if (err){
                throw err;
            }
            var category = new Category(row.id, row.name, row.active, row.createdAt, row.updatedAt);
            categories.push(category);
            console.log(category);
        })
        
        response.json({
            categorias: categories
        });
    })
});

// Função executada ao iniciar o servidor
app.listen(8000, () => {
    console.log('Servidor ligado amigão')
});