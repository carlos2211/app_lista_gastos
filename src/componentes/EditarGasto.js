import React from 'react';
import {Header,Titulo} from '../elementos/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from './../elementos/BtnRegresar'
import BarraTotalGastado from './BarraTotalGastado';
import FormularioGasto from './../componentes/FormularioGasto'
import { useParams } from 'react-router-dom';
import useObtenerGasto from './../hooks/useObtenerGasto'

const EditarGasto = () => {
    const {id} = useParams();
    const [gasto] = useObtenerGasto(id);

    return ( 
        <>
            <Helmet>
            <title>Editar Gastos</title>
            </Helmet>
            
            <Header>
                <BtnRegresar ruta='/lista' />
                <Titulo>Editar Gastos</Titulo>
            </Header>

            <FormularioGasto gasto={gasto} />

            <BarraTotalGastado/>
        </>
     );
}
 
export default EditarGasto;