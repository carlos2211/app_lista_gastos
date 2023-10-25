import React from 'react';
import { Helmet } from 'react-helmet';
import {Header,Titulo,ContenedorHeader,ContenedorBotones} from './elementos/Header';
import { Boton } from './elementos/Boton';
import BotonCerrarSesion from './elementos/BotonCerrarSesion'
import FormularioGasto from './componentes/FormularioGasto';
import BarraTotalGastado from './componentes/BarraTotalGastado';
import BarraIngresos from './componentes/BarraIngresos';
import BarraTotalDisponible from './componentes/BarraTotalDisponible';

const App = () => {
  return ( 
    <>
    <Helmet>
      <title>Agregar Gasto</title>
    </Helmet>
    
    <Header>
      <ContenedorHeader>
        <Titulo>Agregar Gasto</Titulo>
        <ContenedorBotones>
          <Boton to="/ingresos">Ingresos</Boton>
          <Boton to="/categorias">Categoria</Boton>
          <Boton to="lista">Lista gastos</Boton>
          <BotonCerrarSesion />
        </ContenedorBotones>
      </ContenedorHeader>
    </Header>
    <FormularioGasto>
      
    </FormularioGasto>
    <BarraIngresos></BarraIngresos>
    <BarraTotalGastado></BarraTotalGastado>
    <BarraTotalDisponible></BarraTotalDisponible>
    </>
   );
}
 
export default App;