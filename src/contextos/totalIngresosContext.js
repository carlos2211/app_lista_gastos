import React, {useState, useEffect, useContext} from 'react';
import useObtenerIngreso from '../hooks/useObtenerIngreso';

const TotalIngresoContext = React.createContext();

const useIngresos = () => useContext(TotalIngresoContext)

const TotalIngresosProvider = ({children}) =>{    
    const [total, cambiarTotal] = useState(0);
    const ingresos = useObtenerIngreso();
    
    useEffect(()=>{
        let acumulado = 0;
        ingresos.forEach((ingreso)=>{
            acumulado += ingreso.cantidad
        })
        cambiarTotal(acumulado);
    },[ingresos])

    return (
        <TotalIngresoContext.Provider value = {{total_in: total}}>
            {children}
        </TotalIngresoContext.Provider>
    );

}

export {TotalIngresosProvider,useIngresos}