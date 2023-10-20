const express = require('express'); // Carrega a biblioteca dentro da variável express
const sqlite3 = require('sqlite3');
const { Category } = require('./models/category')

const db = new sqlite3.Database('mocaliza_db.db')
const app = express(); // Ao Carregar a biblioteca, o express cria uma função. Ao chamar a 
                       //função e atribuir para app, é criada uma instancia da biblioteca

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS categories (
        id INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        updatedAt TIMESTAMP,
        createdAt TIMESTAMP,
        active BOOLEAN,
        CONSTRAINT categories_pk PRIMARY KEY (category_id)
    );`);
    db.run(`INSERT INTO categories(name) VALUES ('CARROS')`);
    db.run(`INSERT INTO categories(name) VALUES ('MOTOS')`);
    db.run(`INSERT INTO categories(name) VALUES ('TRATORES')`);
    db.run(`INSERT INTO categories(name) VALUES ('SUV')`);
    db.run(`INSERT INTO categories(name) VALUES ('MOTO')`);
});

app.get('/', (request, response) => {
    var categories = []
    db.serialize(() => {
        db.each(`SELECT id, nome from categories`, (err, row) => {
            if (err){
                throw err;
            }
            var category = new Category(id = row.id, name = row.name);
            categories.push(row);
        })

        console.log(categories);
    });

    response.json({
        date: Date.now()
    });
});

// Função executada ao iniciar o servidor
app.listen(8000, () => {
    console.log('Servidor ligado amigão')
});