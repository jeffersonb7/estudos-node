const database = require('../infra/database');

exports.getContatos = function() {
    return database.query('SELECT * FROM Contato')
};

exports.getContato = function(id) {
    return database.oneOrNone('SELECT * FROM Contato WHERE id=$1', [id])
};

exports.getContatoByTelefone = function(telefone) {
    return database.oneOrNone('SELECT * FROM Contato WHERE telefone=$1', [telefone])
};

exports.saveContato = function(contato) {
    return database.one('insert into Contato (telefone, nome, email, imagem) values ($1, $2, $3, $4) returning *', [contato.telefone, contato.nome, contato.email, contato.imagem]);    
};

exports.updateContato = function(id, contato) {
    return database.query('update Contato set telefone=$1, nome=$2, email=$3, imagem=$4 where id=$5', [contato.telefone, contato.nome, contato.email, contato.imagem, id]);    
};

exports.deleteContato = function(id) {
    return database.none('DELETE FROM Contato WHERE id = $1', [id]);
};