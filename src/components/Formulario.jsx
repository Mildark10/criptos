import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas';
import { monedas } from '../data/monedas';
import Error from './Error';

const Inputsubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;
  margin-top: 30px;
  &:hover{
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;
const Formulario = ({setMonedas}) => {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const [ moneda, SelectMonedas] = useSelectMonedas('Elije tu Moneda' , monedas);
  const [ criptomonedas, SelectCriptoMoneda] = useSelectMonedas('Elije tu CriptoMoneda' , criptos);

  //array destructuring te retorna x la posicion y no x el nombre
  useEffect(() => {
    const consultarApi = async () => {
      const url="https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
      const respuesta = await fetch(url)
      const resultado= await respuesta.json()
      //console.log(resultado);
      const arrayCriptos = resultado.Data.map(cripto => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre:cripto.CoinInfo.FullName
        }
        return objeto;
      })
      setCriptos(arrayCriptos);
    }

    consultarApi();
  }, [])
  const handleSubmit = e => {
    e.preventDefault()
    if ([moneda, criptomonedas].includes('')) {
        setError(true)
    }
    setError(false)
    setMonedas({
      moneda,
      criptomonedas
    })
  }
  
  return (
    <>
      {error && <Error>Todo los campos son Obligatorios</Error>}
      <form
        onSubmit={handleSubmit}
      >
      <SelectMonedas />
      <SelectCriptoMoneda />
      <Inputsubmit
        value="Cotizar"
        type="submit"
      />
    </form>
    </>    
    )
}

export default Formulario