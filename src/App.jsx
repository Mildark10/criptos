import { useState , useEffect } from 'react'
import styled from '@emotion/styled'
import imagenCripto from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import Spinner from './components/Spinner'
import Resultado from './components/Resultado'

const Contenedor = styled.div`
  max-width:900px ;
  margin: 0 auto;
  width:90% ;
  @media(min-width:992px){
    display:grid;
    grid-template-columns:repeat(2,1fr);
    colum-gap:2rem;
  }
`
const Imagen = styled.img`
  max-width:400px ;
  margin: 100px auto 0 auto;
  width:80%;
  display:block;
`

const Heading = styled.h1`
  font-family:'Lato' , sans-serif;
  color: #fff;
  text-align: center;
  font-weight:700 ;
  margin-top: 80px;
  margin-bottom: 58px;
  font-size: 34px;
  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

//estilos x fuera de componente
function App() {
  
  const [monedas, setMonedas] =useState({})
  const [resultado, setResultado] =useState({})
  const [cargando, setCargando] =useState(false)

  //vamos a controlar si el objeto de datos q provienen del input trae datos

  useEffect(() => {
    if (Object.keys(monedas).length >0) {
      
      const cotizarCripto = async () => {
        setCargando(true)
        setResultado({})
        const {moneda, criptomonedas} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomonedas}&tsyms=${moneda}`
        const respuesta= await fetch(url)
        const resultado=await respuesta.json()

        setResultado(resultado.DISPLAY[criptomonedas][moneda]);
        setCargando(false)
      }
      cotizarCripto()
    }

  }, [monedas])
  
  return (
    <Contenedor> 
      <Imagen
        src={imagenCripto}
        alt="imagenes Cripto"
      />
      <div>
        <Heading>
          Cotiza Criptomonedas al instante
        </Heading>
        <Formulario
          monedas={monedas}
          setMonedas={setMonedas}
        />
        {cargando&& <Spinner />}
        {resultado.PRICE
          && <Resultado
              resultado={resultado}
            />}
     </div>
     
    </Contenedor>
    )
}

export default App
