const express = require('express');
const app = express();

const contatosRoute = require('./route/contatos.route');

app.use(express.json());
app.use('/', contatosRoute);

app.use(function (error, req, res, next) {
    if (error.message == 'Contato já existe') {
        return res.status(409).send(error.message);
    }
    if (error.message == 'Contato não encontrado') {
        return res.status(404).send(error.message);
    }
    res.status(500).send(error.message);    
});

app.listen(3000, () => {console.log('Server running: http://localhost:3000')});