const express = require('express'); // Carrega a biblioteca dentro da variável express
const app = express(); // Ao Carregar a biblioteca, o express cria uma função. Ao chamar a 
                       //função e atribuir para app, é criada uma instancia da biblioteca

app.get('/', (request, response) => {
    response.json({
        date: Date.now()
    });
});

// Função executada ao iniciar o servidor
app.listen(8000, () => {
    console.log('Servidor ligado amigão')
});