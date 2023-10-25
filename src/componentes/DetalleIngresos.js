import React from 'react';
import {Lista,ElementoLista,Descripcion,Valor,BotonAccion} from './../elementos/ElementosDeLista';
import useObtenerIngreso from './../hooks/useObtenerIngreso'
import { ReactComponent as IconoBorrar } from './../imagenes/borrar.svg';
import borrarIngreso from '../firebase/borrarIngreso';

const DetalleIngresos = () => {
    const ingresos = useObtenerIngreso();
    
    return(
    <Lista>
        {ingresos.map((ingreso,index) =>{
            return (      
                <div key={ingreso.id}>
                    <ElementoLista>
                        <Descripcion>{ingreso.descripcion}</Descripcion>
                        <Valor>${ingreso.cantidad}</Valor>
                        <BotonAccion onClick={(e)=>{e.preventDefault();borrarIngreso(ingreso.id)}} >
                            <IconoBorrar/>
                        </BotonAccion>
                    </ElementoLista>

                </div>   
            );
        })}
    </Lista>
    )
}
 
export default DetalleIngresos;