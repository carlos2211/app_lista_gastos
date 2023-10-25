import React from 'react';
import {Header,Titulo} from '../elementos/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from './../elementos/BtnRegresar'
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastosDelMesPorCategoria from '../hooks/useObtenerGastosDelMesPorCategoria';
import {ListaDeCategorias,ElementoListaCategorias,Categoria,Valor} from './../elementos/ElementosDeLista'
import IconoCategoria from './../elementos/IconoCategoria'


const GastosPorCategoria = () => {
    const GastosPorCategoria = useObtenerGastosDelMesPorCategoria();

    return ( 
        <>
            <Helmet>
            <title>Gastos Por Categoria</title>
            </Helmet>            
            <Header>
                <BtnRegresar />
                <Titulo>Gastos Por Categoria</Titulo>
            </Header>
            <ListaDeCategorias>
                {GastosPorCategoria.map((elemento , index)=>{
                    return (
                        <ElementoListaCategorias key={index}>
                            <Categoria><IconoCategoria id={elemento.categoria}/>{elemento.categoria}</Categoria>
                            <Valor>${elemento.cantidad}</Valor>
                        </ElementoListaCategorias>
                    );
                })}
            </ListaDeCategorias>

                <BarraTotalGastado/>

        </>
     );
}
 
export default GastosPorCategoria;