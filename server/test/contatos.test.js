const axios = require('axios');
const crypto = require('crypto');

const contatosService = require('../service/contatosService');

const generate = function() {
    return crypto.randomBytes(20).toString('hex');
}

const request = function(url, method, data) {
    return axios({ url, method, data, validateStatus: false });
}

test('Listar contatos', async function() {

    const contato2 = await contatosService.saveContato({telefone: generate(), nome: generate(), email: generate(), imagem: generate()});
    const contato3 = await contatosService.saveContato({telefone: generate(), nome: generate(), email: generate(), imagem: generate()});

    const response = await request('http://localhost:3000/contatos','get');
    expect(response.status).toBe(200);
    const contatos = response.data;
    expect(contatos).toHaveLength(2);

    await contatosService.deleteContato(contato2.id);
    await contatosService.deleteContato(contato3.id);

});

// test('Cadastrar uma contato', async function() {
//     const dados = await contatosService.saveContato({telefone: generate(), nome: generate(), email: generate(), imagem: generate()});
//     const response = await request('http://localhost:3000/contatos','post', dados);
//     expect(response.status).toBe(201);
//     const contato = response.data;
//     console.log(contato);
//     expect(contato.nome).toBe(contato.nome);    
//     await contatosService.deleteContato(contato.id);
// });

test('Cadastrar contato', async function() {
    const dados = {telefone: generate(), nome: generate(), email: generate(), imagem: generate()};
    const response = await request('http://localhost:3000/contatos', 'post', dados);
    expect(response.status).toBe(201);
    const contato = response.data;
    expect(contato.nome).toBe(contato.nome);
    await contatosService.deleteContato(contato.id);
});

test('Não cadastrar contato', async function() {
    const dados = {telefone: generate(), nome: generate(), email: generate(), imagem: generate()};
    const resp1 = await request('http://localhost:3000/contatos','post', dados)
    const resp2 = await request('http://localhost:3000/contatos','post', dados)
    expect (resp2.status).toBe(409);
    const contato = resp1.data;
    await contatosService.deleteContato(contato.id)
})

test('Alterar um contato', async function() {

    const dados = await contatosService.saveContato({telefone: generate(), nome: generate(), email: generate(), imagem: generate()});
    dados.nome = generate();
    dados.telefone = generate();
    dados.email = generate();
    const response = await request(`http://localhost:3000/contatos/${dados.id}`,'put', dados);
    expect(response.status).toBe(204);
    const contato = await contatosService.getContato(dados.id);
    expect(contato.nome).toBe(contato.nome)    
    await contatosService.deleteContato(contato.id);

});

test('Alterar um contato não encontrado', async function() {
    const dados = {id: 1}
    const response = await request(`http://localhost:3000/contatos/${dados.id}`,'put', dados);
    expect(response.status).toBe(404);
});

test('Deletar um contato', async function() {
    const dados = await contatosService.saveContato({telefone: generate(), nome: generate(), email: generate(), imagem: generate()});    
    const response = await request(`http://localhost:3000/contatos/${dados.id}`,'delete');
    expect(response.status).toBe(204);
    const contatos = await contatosService.getContatos();
    expect(contatos).toHaveLength(0);
});