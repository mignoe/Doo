import express, { Request, Response } from 'express';


const app = express();
const port = 3000;

app.use(express.json());


interface Tarefa {
    id: number;
    nome: string;
}

let tarefas: Tarefa[] = [];
let nextId = 1;

// Create
app.post('/tarefas', (req, res) => {
    const { nome } = req.body;
    const novaTarefa: Tarefa = { id: nextId++, nome };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

// Read All
app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

// Read One
app.get('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const tarefa = tarefas.find(t => t.id === parseInt(id));
    if (tarefa) {
        res.json(tarefa);
    } else {
        res.status(404).json({ message: 'Tarefa não encontrada' });
    }
});

// Update
app.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    const tarefa = tarefas.find(t => t.id === parseInt(id));
    if (tarefa) {
        tarefa.nome = nome;
        res.json(tarefa);
    } else {
        res.status(404).json({ message: 'Tarefa não encontrada' });
    }
});

// Delete
app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    tarefas = tarefas.filter(t => t.id !== parseInt(id));
    res.status(204).send();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
