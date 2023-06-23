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


  // armazena o objeto atual no array itens com as informações passadas previamentes passadas pelo submit 
  itens.push(itemAtual);

  //armazena o array de itens no localstorage e transforma os objetos em strings
  localStorage.setItem("itens", JSON.stringify(itens));

  //exibe o elemento na página
  criaElemento(itemAtual);

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

  // atribui o html do strong dentro do li
  novoItem.appendChild(numeroItem);

  //atribui o texto do html para o valor de nome do objeto passado
  novoItem.innerHTML += item.nome;

  // adiciona o li na ul (lista)
  lista.appendChild(novoItem);

  //insere o li na primeira posição da lista para que os itens adicionados surja de cima
  lista.insertBefore(novoItem, lista.children[0]);

}

