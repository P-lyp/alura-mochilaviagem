const formulario = document.getElementById("novoItem"); 
const lista = document.getElementById("lista");

//pega os itens no localstorage, converte pra obj e guarda em uma constante
const itens = JSON.parse(localStorage.getItem("itens")) || [];

//le a const dos itens já guardados no localstorage e é parametro de uma arrow function que chama a função de exibir os elementos na página
itens.forEach( (elemento) => {
  criaElemento(elemento);
})

//listener que armazena valores do formulario ao receber submit do formulário
formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = event.target.elements["nome"];  //formulario nome
  const quantidade = event.target.elements["quantidade"]; //formulario quantidade

  //objeto modelo dos itens
  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value,
    };

  //verifica se existe
  existe = itens.find ( elemento => elemento.nome === nome.value);

  if (existe) {
    // como já tem um semelhante registrado, ele atribui ao objeto passado no input o id do objeto que já armazenado
    itemAtual.id = existe.id
    
    //chama a função que substitui o objeto pela quantidade nova que foi passada
    atualizaElemento(itemAtual);

    //armazena no array itens na posição que é o número do id que já existe, o novo objeto semelhante passado pelo input
    itens[existe.id] = itemAtual

  } else {
    //atribui ao objeto novo um id que é o tamanho do array itens 
    itemAtual.id = itens.length

    //exibe o elemento na página
    criaElemento(itemAtual);

    // armazena o objeto atual no array itens com as informações passadas previamentes passadas pelo submit 
    itens.push(itemAtual);

  }
  

  //armazena o array de itens no localstorage e transforma os objetos em strings
  localStorage.setItem("itens", JSON.stringify(itens));

  //limpa os campos do formulários após ter dado submit
  nome.value = "";
  quantidade.value = "";
});

//função que exibe o elemento na página
function criaElemento(item) {

  //cria e atribui os elementos

  //cria um item (li) que faz parte do ul
  const novoItem = document.createElement("li");
  //adiciona a classe para esse item novo
  novoItem.classList.add("item");

  //cria um strong que posteriormente terá que fazer parte dentro do li
  const numeroItem = document.createElement("strong");
  
  //atribui o texto do html para o valor da quantidade do objeto passado
  numeroItem.innerHTML = item.quantidade;

  //atribui o id que foi passado como item atual ao strong(numero) do li
  numeroItem.dataset.id = item.id

  // atribui o html do strong dentro do li
  novoItem.appendChild(numeroItem);

  //atribui o texto do html para o valor de nome do objeto passado
  novoItem.innerHTML += item.nome;


  novoItem.appendChild(botaoDeleta(item.id))

  // adiciona o li na ul (lista)
  lista.appendChild(novoItem);

  //insere o li na primeira posição da lista para que os itens adicionados surja de cima
  lista.insertBefore(novoItem, lista.children[0]);

}

//função que atualiza e substitui um item que já existe com a nova quantidade passada
function atualizaElemento(item) {
  //seleciona o dataset dentro do strong e muda o valor do html para a quantidade nova que foi passada no submit
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta (id) {

  const elementoBotao = document.createElement('button')
  elementoBotao.classList.add('botao__remover')

  


  elementoBotao.addEventListener('click', function() {
    deletaElemento(this.parentNode, id)
  })

  return elementoBotao
}

function deletaElemento(tag, id) {
  tag.remove()

  itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
  
  localStorage.setItem('itens', JSON.stringify(itens))
}
