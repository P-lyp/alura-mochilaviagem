const formulario = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = [];

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = event.target.elements["nome"];
  const quantidade = event.target.elements["quantidade"];

  criaElemento(nome.value, quantidade.value);

  nome.value = "";
  quantidade.value = "";
});

function criaElemento(nome, quantidade) {
  //cria e atribui os elementos
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const numeroItem = document.createElement("strong");
  numeroItem.innerHTML = quantidade;

  // junta os elementos e adiciona
  novoItem.appendChild(numeroItem);
  novoItem.innerHTML += nome;

  lista.appendChild(novoItem);
  lista.insertBefore(novoItem, lista.children[0]);

  const itemAtual = {
    nome: nome,
    quantidade: quantidade,
  };

  itens.push(itemAtual);

  localStorage.setItem("item", JSON.stringify(itens));
}
