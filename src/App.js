import { useEffect, useState } from "react";

export default function App() {
  // Estado para armazenar a lista de compras
  const [listaCompras, setListaCompras] = useState([]);

  // Estado para armazenar o valor do item sendo digitado
  const [item, setItem] = useState("");

  // Função para adicionar um item à lista de compras
  const adicionarItem = () => {
    if (item.trim() !== "") {
      // Verifica se o item não está vazio ou contém apenas espaços em branco
      setListaCompras([...listaCompras, item]); // Adiciona o item à lista de compras
      setItem(""); // Limpa o campo de entrada
    }
  };
// PRATICA 1
// funcao para adicionar no local storage os items
  const saveLocalStorage = () => {
    const listaString = JSON.stringify(listaCompras)
  localStorage.setItem('lista',listaString)
  }

  //PRATICA 2
// pegar os items no localstorage
  const getItemsLocalStorage = () =>{
 // peguei do local storage
    const listaString = localStorage.getItem('lista')
    // transformei no array
    const listaArray = JSON.parse(listaString)

  // mostrar na tela a lista do local storage
  if(listaArray) { setListaCompras(listaArray) }

  }
// PRATICA 3

// acontece 1x quando minha pagina eh montada
  useEffect(() =>{
    getItemsLocalStorage()
  }, [])

  // salvar a lista automatica/ acontece toda vez que o estado listaCompras eh atualizado
  useEffect(()=>{
  listaCompras.length && saveLocalStorage()
  }, [listaCompras])

  const removeLocalStorage = () => {
    localStorage.removeItem(`lista`)
    setListaCompras([])
  }


  return (
    <div>
      <h1>Lista de Compras</h1>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Digite um item"
      />
      <button onClick={adicionarItem}>Adicionar</button>
      {/* <button onClick={saveLocalStorage}>Salvar no Local Storage</button>
      <button onClick={getItemsLocalStorage}>Pegar no Local Storage</button> */}
      <button onClick={removeLocalStorage}>Remover do Local Storage</button>


      <ul>
        {listaCompras.map((compra, index) => (
          <li key={index}>{compra}</li>
        ))}
      </ul>
    </div>
  );
}