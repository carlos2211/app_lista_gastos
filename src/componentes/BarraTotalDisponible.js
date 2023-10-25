import React from 'react';
import styled from 'styled-components';
import theme from '../elementos/theme';
import {useIngresos}  from '../contextos/totalIngresosContext';
import {useTotalDelMes} from '../contextos/totalGastadoEnElMesContext';

const BarraTotal = styled.div`
    background: ${theme.amarillo};
    font-size: 1.25rem; /* 20px */
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 0.62rem 2.25rem; /* 10px 40px */
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
 
    @media(max-width: 31.25rem) { /* 500px */
        flex-direction: column;
        font-size: 14px;
    }
`;

const BarraTotalDisponible = () => {
    const  {total} = useTotalDelMes();
    const tot = {total}.total;
    const  {total_in} = useIngresos(); 
    const totIn = {total_in}.total_in;
    const resultado = totIn - tot ;
    

  

    // console.log('total_In:',{total_in});
    // console.log('total :',{total});

    return ( 
        <BarraTotal>
            <p>Total Disponible:</p>
            <p>${resultado}</p>
        </BarraTotal>
     );
}
 
export default BarraTotalDisponible;