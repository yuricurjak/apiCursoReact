const routes = require('express').Router();
const bodyParser = require('body-parser');

routes.use(bodyParser.json());

let vetAutores = [{id: 1, nome: 'yuri', email: 'yuri@hotmail.com'},
    {id: 2, nome: 'andre', email: 'andre@hotmail.com'}];
let tamVetAutores = vetAutores.length;

let vetLivros = [{id: 1, titulo: 'A sutil arte de ligar o f*da-se', preco: 20, autor:{id: 1, nome: 'Mark Manson', email: 'yuri@hotmail.com'}},
    {id: 2, titulo: 'Mitólogia Nordica', preco: 30, autor:{id: 2, nome: 'Neil Gaiman', email: 'yuri@hotmail.com'}}];
let tamVetLivros = vetLivros.length;

routes.get('/autores', (req, res) =>{
    console.log('Requisição de autores recebida.');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(JSON.stringify(vetAutores));
});

routes.get('/livros', (req, res) =>{
    console.log('Requisição de livros recebida.');
    res.status(200).send(JSON.stringify(vetLivros));
});

routes.post('/autores', (req, res) =>{
    if(req.body.nome === undefined || req.body.nome === '' || req.body.email === undefined || req.body.email === '' ||
        req.body.senha === undefined || req.body.senha === ''
    ){
        console.log('requisição vazia recebida.');
        let message = '';
        console.log(message);
        return res.status(400).send(JSON.stringify({error:'Parâmetros não podem estar vazios.', message}))
    }
    console.log('Requisição POST /autores recebida');
    let obj = req.body;
    console.log(req.body);

    obj.id = ++tamVetAutores;
    vetAutores.push(obj);
    res.status(200).send(req.body);
});

routes.post('/livros', (req, res) =>{
    if(req.body.titulo === undefined || req.body.titulo === '' || req.body.preco === undefined || req.body.preco === '' ||
        req.body.AutorId === undefined || req.body.AutorId === ''
    ){
        console.log('requisição de livros vazia recebida.');
        let message = '';
        console.log(message);
        return res.status(400).send(JSON.stringify({error:'Parâmetros não podem estar vazios.', message}))
    }
    console.log('Requisição POST /livros recebida');
    let obj2 = req.body;
    console.log(req.body);

    obj2.id = ++tamVetLivros;
    vetAutores.forEach((element) =>{
        if(obj2.AutorId == element.id){
            obj2.autor = element;
            delete obj2.AutorId;
        }
    });
    vetLivros.push(obj2);
    res.status(200).send(req.body);
});

module.exports = routes;

