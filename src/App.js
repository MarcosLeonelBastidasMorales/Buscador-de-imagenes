import React, {useState, useEffect} from 'react';
import Buscador from './components/Buscador';
import ListaImagenes from './components/ListaImagenes';
import { async } from 'q';

function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  useEffect( () =>{
    const consultarAPI= async () =>{

      if (busqueda ==='') return;

      const imagenesPorPagina=30;
      const key = '13529044-67918e55aab1272bf8c82bb79' ;
      const url= `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;


      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarImagenes(resultado.hits)

      // CALCULAR EL TOTAL DE PAGINAS

      const calcularTotalPaginas = Math.ceil( resultado.totalHits / imagenesPorPagina)
      guardarTotalPaginas(calcularTotalPaginas);

      // Mover la pantalla hacia la parte superior
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior : 'smooth', block: 'end'});


    }

    consultarAPI();
  }, [busqueda, paginaActual ] )

  const paginaAnterior = () =>{
    let nuevaPaginaActucal= paginaActual - 1 ;
    //colocarlo en el state
    guardarPaginaActual(nuevaPaginaActucal)



    }

  const paginaSiguiente = () =>{
    
    let nuevaPaginaActucal= paginaActual + 1 ;
    guardarPaginaActual(nuevaPaginaActucal);

  }

  return (
    <div className="app container">
      <div className="jumbotron">
        <p className='lead text-center'>Buscador de Imagenes</p>
        <Buscador 
          guardarBusqueda={guardarBusqueda}

        />
      </div>
      
      <div className="row justify-content-center">

        <ListaImagenes 
          imagenes={imagenes}
        />
        {(paginaActual===1)? null 
          : 
          <button onClick={paginaAnterior}  type="button" className="btn btn-info mr-1">Anterior &laquo;</button> }
        
       
        {(paginaActual=== totalPaginas)  ? null
          :  
          <button onClick={paginaSiguiente} type="button" className="btn btn-info">Siguiente &raquo;</button>
        }
        
      </div>

    </div>
  );
}

export default App;
