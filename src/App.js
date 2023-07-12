import {FiSearch} from 'react-icons/fi';
import { useState } from 'react';
import './styles.css';
import api from './app/api';

function App() {

  const [input, setInput] = useState();
  const [id, setId] = useState({})

  async function handleSearch(){

    const min = input.toLowerCase();
    const rep = min.split(" ").join("-")

    if(input === ""){
      alert("Preencha o campo!")
      return;
    }
    const response = await api.get(`${rep.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`)
    setId(response.data)
    setInput("")
  }

  return (
    <div className="containter">
        <h1 className="title">BUSCADOR DE ID IBGE</h1>

        <div className="containerInput">
          <input
          type="text"
          placeholder="Digite a cidade"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='black'/>
        </button>
        </div>

        <main className='main'>
          <span>Cidade: {id.nome}</span>
          <span>Id: {id.id}</span>
        </main>

    </div>
  );
}

export default App;
