const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let tarefas = [{
  'id': 1,
  'task': 'tarefa 1',
  'desc': 'desc tarefa 1',
  'data': 'data tareda 1'
},
{
  'id': 2,
  'task': 'tarefa 2',
  'desc': 'desc tarefa 2',
  'data': 'data tareda 2'
}];

app.get('/', (req, res) => {
  res.json('Hello World');
});

app.get('/tarefas', (req, res) => {  
  res.json(tarefas);
})

app.get('/tarefas/:id', (req, res) => {
  const tarefa = tarefas.find((todo) => {return todo.id == req.params.id});
  if (tarefa) {
    res.json(tarefa);
  }  else {
    res.status(404).json('Tarefa não encontrada');
  }  
});

app.post('/tarefas', (req, res) => {
  const tarefa = req.body;
  if (tarefas !== undefined) {
    tarefa.id = tarefas.length + 1; // Alterar depois
    tarefas.push(tarefa);
  }
  res.json('Tarefa cadastrada com sucesso');
});

app.put('/tarefas/:id', (req, res) => {
  const tarefa = tarefas.find((tarefa) => {return tarefa.id == req.params.id});
  if (tarefa) {
    tarefa.task = req.body.task;
    tarefa.desc = req.body.desc;
    tarefa.data = req.body.data;
  }  else {
    res.status(404).json('Tarefa não encontrada');
  } 
  res.json(tarefa)
});

app.delete('/tarefas/:id', (req, res) => {
  const id = req.params.id;

  tarefas = tarefas.filter((tarefa) => {
    return tarefa.id != id;
  });
  res.json('Tarefa excluida com sucesso!')
});

app.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000/')
});