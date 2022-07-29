const contatosData = require('../data/contatosData');

exports.getContatos = function() {
    return contatosData.getContatos();
};

exports.getContato = async function(id) {
    const contato = await contatosData.getContato(id);
    if (!contato) throw new Error('Contato não encontrado');
    return contato;
};

exports.saveContato = async function(contato) {
    const novoContato = await contatosData.getContatoByTelefone(contato.telefone);
    if (novoContato) throw new Error('Contato já existe');
    return contatosData.saveContato(contato);
};

exports.deleteContato = function(id) {
    return contatosData.deleteContato(id);
};

exports.updateContato = async function(id, contato) {
    await exports.getContato(id);
    return contatosData.updateContato(id, contato);
}