import {useState,useEffect} from 'react';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../contextos/AuthContext';
import { collection, onSnapshot, query,orderBy, where } from 'firebase/firestore';

const useObtenerIngreso = () => {
    const {usuario} = useAuth();
    const [ingresos, cambiarIngresos] = useState([]);
 

    useEffect(()=>{  
        if (usuario != null) {
            console.log('usuario autenticado')
            const consulta = query(
                collection(db,'ingresos'),
                where('uidUsuario', '==', usuario.uid),
                orderBy('fecha','desc'),
            );
    
            const unsuscribe = onSnapshot(consulta,(snapshot)=>{
                if (snapshot.docs.length > 0) {
                    cambiarIngresos(snapshot.docs[snapshot.docs.length -1])
                }
                
                cambiarIngresos(snapshot.docs.map((ingreso) => {
                    return {...ingreso.data(), id:ingreso.id}         
                
                }));
            });

            return unsuscribe;
        }else{
            console.log('usuario no autenticado')       
        };     

       
        

    },[usuario])      
    
return ingresos;

  
}

export default useObtenerIngreso;