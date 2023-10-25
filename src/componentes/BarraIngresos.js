import React from 'react';
import styled from 'styled-components';
import theme from '../elementos/theme';
// import { useTotalDelMes } from '../contextos/totalGastadoEnElMesContext';
import {useIngresos}  from '../contextos/totalIngresosContext';

const BarraTotal = styled.div`
    background: ${theme.azul};
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

const BarraIngresos = () => {
    const {total_in} = useIngresos();

    return ( 
        <BarraTotal>
            <p>Ingresos del mes :</p>
            <p>${total_in}</p>
        </BarraTotal>
     );
}
 
export default BarraIngresos;