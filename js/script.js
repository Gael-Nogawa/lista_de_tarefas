const inputTarefas = document.querySelector('.input-tarefa');
const btnTarefas = document.querySelector('.btn-tarefa');
const adicionaTarefas = document.querySelector('.insere-tarefa');

function criaLi(){
    const li = document.createElement('li');
    return li;
   
}
        
inputTarefas.addEventListener('keypress', function(e){
    if( e.keyCode === 13){
        if (!inputTarefas.value) return;
        criaTarefa(inputTarefas.value);
    }
}) 

btnTarefas.addEventListener('click', function(){
    if(!inputTarefas.value) return;
    criaTarefa(inputTarefas.value);
});

function criaTarefa(textoInput){
    const li = criaLi()
    li.innerText = textoInput;
    adicionaTarefas.appendChild(li);

    limpaInput();
    criaBotaoApaga(li);
    salvarTarefas();
}

function limpaInput(){
    inputTarefas.value = '';
    inputTarefas.focus();
}

function criaBotaoApaga(li){
    li.innerText += ' ';
    const botaoApaga = document.createElement('button')
    botaoApaga.innerText = 'APAGAR';
    botaoApaga.setAttribute('class', 'apaga');
    botaoApaga.setAttribute('title', 'apagar tarefa')
    li.appendChild(botaoApaga);
}

document.addEventListener('click', function(e){
    const elem = e.target;

    if (elem.classList.contains('apaga')){
        elem.parentElement.remove();
        salvarTarefas();
    };
});

function salvarTarefas(){
    const liTarefa = adicionaTarefas.querySelectorAll('li');
    const listaDeTarefas = [];
    
    for (let tarefa of liTarefa){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('APAGAR', '').trim();
        listaDeTarefas.push(tarefaTexto);
        
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefa', tarefasJSON);
}

function tarefaSalvaNaPagina(){
    const tarefas = localStorage.getItem('tarefa');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}

tarefaSalvaNaPagina();