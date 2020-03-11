/*class List{
    constructor(){
        this.data = [];
    }
    add(data){
        this.data.push(data);
        console.log(this.data);
    }
}


class TodoList extends List{
    constructor(){
        super();

        this.usuario = 'Luan';
    }
    mostraUsuario(){
        console.log(this.usuario);
    }
}

const MinhaLista = new TodoList();

document.getElementById('novotodo').onclick = function(){
    MinhaLista.add('Novo todo');
}

MinhaLista.mostraUsuario();*/

/*const arr = [1, 3, 4, 5, 8, 9];


const newArr = arr.map(item => item*2);

console.log(newArr);

const nome = () => ({ nome: 'Luan'});

console.log(nome());*/

/*const newArr = arr.map(function(item, index){
    return item + index;
});

console.log(newArr);


const sum = arr.reduce(function(total, next){
    return total + next;
});

console.log(sum);

const filter = arr.filter(function(item){
    return item % 2 === 0;
});

console.log(filter);

const find = arr.find(function(item){
    return item === 2;
});

console.log(find);*/


/*const usuario = {
    nome: 'Luan',
    idade: 20,
    endereco: {
        cidade: 'São paulo',
        estado: 'SP',
    },
};

console.log(usuario.endereco.cidade, usuario.nome, usuario.idade);

const campos = usuario.nome + " " + usuario.idade + " " + usuario.endereco.cidade;

console.log(campos);

const { nome, idade, endereco: {cidade }} = usuario;

console.log(nome);
console.log(idade);
console.log(cidade);

function mostraNome({nome, idade}){
    console.log(nome, idade);
}

mostraNome(usuario);*/

/*const usuario = {
    nome: 'luan',
    idade: 20,
    empresa: 'GFT'
};

const {nome, ...resto} = usuario;

console.log(nome);
console.log(resto);*/


//EXERCICIOS CONCEITOS ES6

/*const empresa = {
    nome: 'Rocketseat',
    endereco: {
    cidade: 'Rio do Sul',
    estado: 'SC',
    }
    };

const {nome, endereco: {cidade}, endereco:{estado}} = usuario;

console.log(nome);
console.log(endereco.cidade);
console.log(endereco.estado);*/


/*const nome = 'Diego';
const idade = 23;
const usuario = {
nome,
idade,
cidade: 'Rio do Sul',
};

console.log(usuario);*/

/*import { soma, sub } from './funcoes';

console.log(soma(1, 2));
console.log(sub(8, 5));*/


/*const minhaPromise = () => new Promise((resolve, reject) => {
    setTimeout(() => {resolve('ok')}, 2000);
});

async function executaPromise(){
    console.log(await minhaPromise());
    console.log(await minhaPromise());
    console.log(await minhaPromise());
}

executaPromise();*/

/*import axios from 'axios';

class Api{
    static async getUserInfo(username){
        try{
        const response = await axios.get(`https://api.github.com/users/${username}`);
            console.log(response);    
        }catch(err){
            console.warn('Erro na Api');
        }
    }
}

Api.getUserInfo('luan-css');*/
import api from './api';
class App{
    constructor(){
        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]')
        this.listEl = document.getElementById('repo-list');

        this.registerHandlers();
    }
    registerHandlers(){
        this.formEl.onsubmit = event => this.addRepository(event);

    }
    setLoading(loading = true){
        if(loading === true){
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando'));
            loadingEl.setAttribute('id', 'loading');


            this.formEl.appendChild(loadingEl);
        }else{
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event){
        event.preventDefault();

        const repoInput = this.inputEl.value;
        if(repoInput.lenght === 0)
            return;
            this.setLoading();

            try{
        const response = await api.get(`/repos/${repoInput}`);

        const { name, description, html_url, owner:{ avatar_url}} = response.data;

        this.repositories.push({
           name,
           description,
           avatar_url,
           html_url,
        });

        this.inputEl.value = '';


        this.render();
    }catch(err){
        alert('não existe');
    }
    this.setLoading(false);
    }
    render(){
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);

        });
    }
}
new App();
function saveToStorage(){

    localStorage.setItem('list_todos', JSON.stringify(todos));
}